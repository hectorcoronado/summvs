import React, { Component } from 'react'
import { Button, Col, Image, Row, Well } from 'react-bootstrap'
import { connect } from 'react-redux'

import { addToCart, updateCart } from '../actions/cartActions'
import { getProducts } from '../actions/productsActions'

import IngredientList from './IngredientList'

class ProductItem extends Component {
  constructor (props) {
    super(props)

    this.state = {
      msg: null
    }
  }

  componentWillUnmount () {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
  }

  handleCart () {
    const {
      addToCart, cart, description, _id, image, ingredients, inventory, name, price, products, updateCart
    } = this.props

    const product = [
      ...cart,
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

    // check if cart is empty or not:
    if (cart.length > 0) {
      // if cart is not empty:
      let cartIndex = cart.findIndex(
        (cart) => { return cart._id === _id }
      )
      // if cartIndex returns -1, there are no items w/same id:
      if (cartIndex === -1) {
        addToCart(product)
      } else {
        // otherwise, check inventory & update quantity if available:
        const inventoryQty = products.find(prod => prod._id === _id).inventory
        const productQty = cart.find(prod => prod._id === _id).quantity
        const productName = cart.find(prod => prod._id === _id).name

        productQty < inventoryQty
          ? updateCart(_id, 1, cart)
          : this.setState({
            msg: `sorry, there are no more ${productName}s available.`
          })

        if (this.state.msg !== null) {
          this.timeout = setTimeout(() => {
            this.setState({msg: ''})
          }, 5000)
        }
      }
    } else {
      // and if cart is empty:
      addToCart(product)
    }
  }

  render () {
    return (
      <Well>
        <Row>
          <Col xs={12} sm={4}>
            <Image src={this.props.image} responsive />
          </Col>
          <Col xs={6} sm={8}>
            <h6>{this.props.name}</h6>
            <p>{this.props.description}</p>
            <IngredientList ingredients={this.props.ingredients} />
            <h6>usd {this.props.price}</h6>
            <h6 className='error'>
              <strong>{(!this.state.msg) ? ('') : (this.state.msg)}</strong>
            </h6>
            <Button
              bsStyle='link align-left'
              onClick={this.handleCart.bind(this)}
            >
              add to cart
            </Button>
          </Col>
        </Row>
      </Well>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
    products: state.products.products
  }
}

export default connect(mapStateToProps, {
  addToCart, getProducts, updateCart
})(ProductItem)
