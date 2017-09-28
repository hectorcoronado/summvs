import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Button, ButtonGroup, Col, Label, Panel, Row
} from 'react-bootstrap'

import Checkout from './stripe/Checkout'

import { deleteCartItem, getCart, updateCart } from '../actions/cartActions'
import { getProducts } from '../actions/productsActions'

class Cart extends Component {
  constructor (props) {
    super(props)

    this.state = {
      msg: null
    }
  }

  componentDidMount () {
    this.props.getCart()
    this.props.getProducts()
  }

  renderEmpty () {
    return (
      <div>
        your cart is empty.
      </div>
    )
  }

  onDelete (_id) {
    const currentProductToDelete = this.props.cart

    const indexToDelete = currentProductToDelete.findIndex(
      (cart) => { return cart._id === _id })

    let cartAfterDelete = [
      ...currentProductToDelete.slice(0, indexToDelete), ...currentProductToDelete.slice(indexToDelete + 1)
    ]

    this.props.deleteCartItem(cartAfterDelete)
  }

  onIncrement (_id) {
    let { cart, products, updateCart } = this.props
    let inventoryQty = products.find(prod => prod._id === _id).inventory
    let productQty = cart.find(prod => prod._id === _id).quantity
    let productName = cart.find(prod => prod._id === _id).name

    productQty < inventoryQty
      ? updateCart(_id, 1, cart)
      : this.setState({
        msg: `sorry, there are no more ${productName}s available.`
      })

    setTimeout(() => {
      this.setState({msg: ''})
    }, 5000)
  }

  onDecrement (_id, quantity) {
    quantity > 1
      ? this.props.updateCart(_id, -1, this.props.cart)
      : this.onDelete(_id)
  }

  renderCart () {
    const cartItemsList = this.props.cart.map(
      (cartArr) => {
        return (
          <Panel key={cartArr._id}>
            <Row>
              <Col xs={12} sm={4}>
                <h6>{cartArr.name}</h6>
              </Col>
              <Col xs={12} sm={2}>
                <h6>usd {cartArr.price}</h6>
              </Col>
              <Col xs={6} sm={2}>
                <h6>qty:
                  <Label
                    bsStyle='default'
                    style={{marginLeft: '4px'}}
                  >
                    {cartArr.quantity}
                  </Label>
                </h6>
              </Col>
              <Col xs={6} sm={2}>
                <ButtonGroup style={{minWidth: '300px'}}>
                  <Button
                    bsStyle='default'
                    bsSize='xsmall'
                    onClick={this.onDecrement.bind(this, cartArr._id, cartArr.quantity)}
                    title='-1'
                  >
                    -
                  </Button>
                  <Button
                    bsStyle='default'
                    bsSize='xsmall'
                    onClick={this.onIncrement.bind(this, cartArr._id)}
                    title='+1'
                  >
                    +
                  </Button>
                  <Button
                    bsStyle='default'
                    bsSize='xsmall'
                    onClick={this.onDelete.bind(this, cartArr._id)}
                    title='remove all'
                  >
                    x
                  </Button>
                </ButtonGroup>
              </Col>
            </Row>
          </Panel>
        )
      }, this
    )

    return (
      <Panel header='cart'>
        {cartItemsList}
        <Row>
          <Col xs={12}>
            <h6 className='error'>
              <strong>{(!this.state.msg) ? ('') : (this.state.msg)}</strong>
            </h6>
            <h6>order total: {this.props.totalAmount}</h6>
            <Checkout
              totalAmount={this.props.totalAmount}
              productNames={this.props.cart.map(
                (cartArr) => cartArr.name
              )}
              productsIDs={this.props.cart.map(
                (cartArr) => cartArr._id
              )}
              quantities={this.props.cart.map(
                (cartArr) => cartArr.quantity
              )}
            />
          </Col>
        </Row>
      </Panel>
    )
  }

  render () {
    if (this.props.cart[0]) {
      return this.renderCart()
    } else {
      return this.renderEmpty()
    }
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
    totalAmount: state.cart.totalAmount,
    products: state.products.products
  }
}

export default connect(mapStateToProps, {
  deleteCartItem, getCart, getProducts, updateCart
})(Cart)
