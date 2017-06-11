import axios from 'axios'
import React, { Component } from 'react'
import {
  Button, Col, ControlLabel, DropdownButton, FormControl, FormGroup, Image, InputGroup, MenuItem, Panel, Row, Well
} from 'react-bootstrap'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import uniqid from 'uniqid'

import {
  postProducts, getProducts, deleteProduct, resetButton
} from '../actions/productsActions'

class ProductsForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      image: [{}],
      img: ''
    }
  }

  componentDidMount () {
    this.props.getProducts()

    axios.get('/api/images')
      .then((response) => {
        this.setState({ image: response.data })
      })
      .catch((err) => {
        this.setState({
          image: `Error loading image files from server: ${err}`,
          img: ''
        })
      })
  }

  handleSubmit () {
    const product = [{
      name: findDOMNode(this.refs.name).value,
      image: findDOMNode(this.refs.image).value,
      price: findDOMNode(this.refs.price).value,
      description: findDOMNode(this.refs.description).value,
      ingredients: findDOMNode(this.refs.ingredients).value.split('&'),
      inventory: findDOMNode(this.refs.inventory).value
    }]

    this.props.postProducts(product)
  }

  onDelete () {
    let productId = findDOMNode(this.refs.delete).value

    this.props.deleteProduct(productId)
  }

  handleSelect (img) {
    this.setState({
      img: `/images/${img}`
    })
  }

  resetForm () {
    this.props.resetButton()
    findDOMNode(this.refs.name).value = ''
    findDOMNode(this.refs.price).value = ''
    findDOMNode(this.refs.description).value = ''
    findDOMNode(this.refs.ingredients).value = ''
    findDOMNode(this.refs.inventory).value = ''
    this.setState({ image: [{}], img: '' })
  }

  render () {
    const productsList = this.props.products.map(
      (productsArr) => {
        return (
          <option key={productsArr._id}>{productsArr._id}</option>
        )
      }
    )

    const imgList = this.state.image.map(
      (imgArr, i) => {
        return (
          <MenuItem
            key={i}
            onClick={this.handleSelect.bind(this, imgArr.name)}
          >
            {imgArr.name}
          </MenuItem>
        )
      }, this
    )

    return (
      <Well>
        <Row>
          <Col xs={12} sm={6}>
            <Panel>
              <InputGroup>
                <FormControl
                  type='text'
                  ref='image'
                  value={this.state.img}
                />
                <DropdownButton
                  componentClass={InputGroup.Button}
                  id='input-dropdown-addon'
                  title='Select an Image'
                  bsStyle='primary'
                >
                  {imgList}
                </DropdownButton>
              </InputGroup>
              <Image src={this.state.img} responsive />
            </Panel>
          </Col>
          <Col xs={12} sm={6}>
            <Panel>
              <FormGroup controlId='name'>
                <ControlLabel>Name:</ControlLabel>
                <FormControl
                  type='text'
                  placeholder='Enter Product Name'
                  ref='name'
                />
              </FormGroup>
              <FormGroup controlId='description'>
                <ControlLabel>Description:</ControlLabel>
                <FormControl
                  type='text'
                  placeholder='Enter Description'
                  ref='description'
                />
              </FormGroup>
              <FormGroup controlId='price'>
                <ControlLabel>Price:</ControlLabel>
                <FormControl
                  type='number'
                  min='1'
                  placeholder='1.0'
                  step='0.10'
                  ref='price'
                />
              </FormGroup>
              <FormGroup controlId='inventory'>
                <ControlLabel>Inventory Quantity:</ControlLabel>
                <FormControl
                  type='number'
                  min='0'
                  placeholder='0'
                  ref='inventory'
                />
              </FormGroup>
              <FormGroup controlId='ingredients'>
                <ControlLabel>List Ingredients:</ControlLabel>
                <FormControl
                  type='text'
                  placeholder="List ingredients separated by a '&'"
                  ref='ingredients'
                  key={uniqid()}
                />
              </FormGroup>
              <Button
                bsStyle={(!this.props.style) ? ('primary') : (this.props.style)}
                onClick={(!this.props.msg) ? (this.handleSubmit.bind(this)) : (this.resetForm.bind(this))}
              >
                {
                  (!this.props.msg) ? ('Save Product') : (this.props.msg)
                }
              </Button>
            </Panel>
            <Panel style={{marginTop: '25px'}}>
              <FormGroup controlId='formControlsSelect'>
                <ControlLabel>Select a Product to Delete:</ControlLabel>
                <FormControl ref='delete' componentClass='select' placeholder='select'>
                  <option value='select'>select</option>
                  {productsList}
                </FormControl>
              </FormGroup>
              <Button
                bsStyle='danger'
                bsSize='xsmall'
                onClick={this.onDelete.bind(this)}
              >
                Delete Product
              </Button>
            </Panel>
          </Col>
        </Row>
      </Well>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products.products,
    msg: state.products.msg,
    style: state.products.style
  }
}

export default connect(
  mapStateToProps,
  { postProducts, getProducts, deleteProduct, resetButton }
)(ProductsForm)
