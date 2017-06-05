import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Button, ButtonGroup, Col, Label, Panel, Row
} from 'react-bootstrap'

import { deleteCartItem, updateCart } from '../actions/cartActions'

class Cart extends Component {
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
    // TODO: check against inventory!!! (but only remove from inv upon purchase)
    this.props.updateCart(_id, 1)
  }

  onDecrement (_id, quantity) {
    if (quantity > 1) {
      this.props.updateCart(_id, -1)
    }
  }

  renderCart () {
    const cartItemsList = this.props.cart.map(
      (cartArr) => {
        return (
          <Panel key={cartArr._id}>
            <Row>
              <Col xs={12} sm={4}>
                <h6>{cartArr.name}</h6><span>     </span>
              </Col>
              <Col xs={12} sm={2}>
                <h6>USD {cartArr.price}</h6>
              </Col>
              <Col xs={6} sm={2}>
                <h6>Qty:
                  <Label bsStyle='success'>{cartArr.quantity}</Label>
                </h6>
              </Col>
              <Col xs={6} sm={2}>
                <ButtonGroup style={{minWidth: '300px'}}>
                  <Button
                    bsStyle='default'
                    bsSize='xsmall'
                    onClick={this.onDecrement.bind(this, cartArr._id, cartArr.quantity)}
                  >
                    -
                  </Button>
                  <Button
                    bsStyle='default'
                    bsSize='xsmall'
                    onClick={this.onIncrement.bind(this, cartArr._id)}
                  >
                    +
                  </Button>
                </ButtonGroup>
                <Button
                  bsStyle='link'
                  bsSize='small'
                  onClick={this.onDelete.bind(this, cartArr._id)}
                >
                  Remove
                </Button>
              </Col>
            </Row>
          </Panel>
        )
      }, this
    )

    return (
      <Panel header='Cart'>
        {cartItemsList}
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
    cart: state.cart.cart
  }
}

export default connect(mapStateToProps, { deleteCartItem, updateCart })(Cart)
