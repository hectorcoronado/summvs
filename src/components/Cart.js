import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Button, ButtonGroup, Col, Label, Panel, Row
} from 'react-bootstrap'

import Checkout from './stripe/Checkout'

import { deleteCartItem, getCart, updateCart } from '../actions/cartActions'

class Cart extends Component {
  componentDidMount () {
    this.props.getCart()
  }

  renderEmpty () {
    return (
      <div>
        Your cart is empty.
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
    this.props.updateCart(_id, 1, this.props.cart)
  }

  onDecrement (_id, quantity) {
    if (quantity > 1) {
      this.props.updateCart(_id, -1, this.props.cart)
    }
  }

  renderCart () {
    const cartItemsList = this.props.cart.map(
      (cartArr) => {
        return (
          <Panel key={cartArr._id}>
            <Row>
              <Col xs={12} sm={4}>
                <h6>{cartArr.name}</h6><span />
              </Col>
              <Col xs={12} sm={2}>
                <h6>usd {cartArr.price}</h6>
              </Col>
              <Col xs={6} sm={2}>
                <h6>qty:
                  <Label
                    bsStyle='success'
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
            <h6>order total: {this.props.totalAmount}</h6>
            <Checkout
              totalAmount={this.props.totalAmount}
              product={this.props.cart.map(
                (cartArr) => cartArr.name
              )}
              quantity={this.props.cart.map(
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
    totalAmount: state.cart.totalAmount
  }
}

export default connect(mapStateToProps, { deleteCartItem, getCart, updateCart })(Cart)
