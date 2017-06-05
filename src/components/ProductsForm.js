import React, { Component } from 'react'
import {
  Button, ControlLabel, FormControl, FormGroup, Panel, Well
} from 'react-bootstrap'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'

import { postProducts } from '../actions/productsActions'

class ProductsForm extends Component {
  handleSubmit () {
    const product = [{
      name: findDOMNode(this.refs.name).value,
      description: findDOMNode(this.refs.description).value,
      price: findDOMNode(this.refs.price).value,
      inventory: findDOMNode(this.refs.inventory).value,
      ingredients: findDOMNode(this.refs.ingredients).value.split(' ')
    }]

    this.props.postProducts(product)
  }
  render () {
    return (
      <Well>
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
              placeholder='List ingredients separated by a space'
              ref='ingredients'
            />
          </FormGroup>
          <Button
            bsStyle='primary'
            onClick={this.handleSubmit.bind(this)}
          >
            Save Product
          </Button>
        </Panel>
      </Well>
    )
  }
}

export default connect(null, { postProducts })(ProductsForm)
