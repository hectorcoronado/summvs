import React, { Component } from 'react'
import { Button, Col, Row, Well } from 'react-bootstrap'
import { connect } from 'react-redux'

import { addToCart, updateCart } from '../actions/cartActions'

import IngredientList from './IngredientList'

/*
_id: 1,
name: 'Soap',
image: 'Image',
price: 10,
description: 'Simple Soap',
ingredients: ['Soap'],
inventory: 1
*/

class ProductItem extends Component {
  handleCart () {
    const {
      _id, name, image, price, description, ingredients, inventory
    } = this.props

    const product = [
      ...this.props.cart,
      {
        _id,
        name,
        image,
        price,
        description,
        ingredients,
        inventory,
        quantity: 1
      }
    ]

    // check if cart is empty:
    if (this.props.cart.length > 0) {
      // cart is not empty:
      let cartIndex = this.props.cart.findIndex(
        (cart) => { return cart._id === _id }
      )
      // TODO: check against product inventory when adding/updating
      // if cartIndex returns -1, there are no items w/same id:
      if (cartIndex === -1) {
        this.props.addToCart(product)
      } else {
        // otherwise, update quantity:
        this.props.updateCart(_id, 1)
      }
    } else {
      // cart is empty:
      this.props.addToCart(product)
    }
  }

  render () {
    return (
      <Well>
        <Row>
          <Col xs={12}>
            <h6>{this.props.name}</h6>
            <p>{this.props.description}</p>
            <IngredientList ingredients={this.props.ingredients} />
            <h6>USD {this.props.price}</h6>
            <Button
              bsStyle='primary'
              onClick={this.handleCart.bind(this)}
            >
              Add To Cart
            </Button>
          </Col>
        </Row>
      </Well>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart
  }
}

export default connect(mapStateToProps, { addToCart, updateCart })(ProductItem)
