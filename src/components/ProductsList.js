import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col, Grid, Row } from 'react-bootstrap'

import { getProducts } from '../actions/productsActions'

import Cart from './Cart'
import ProductsForm from './ProductsForm'
import ProductItem from './ProductItem'

class ProductsList extends Component {
  componentDidMount () {
    this.props.getProducts()
  }

  render () {
    // NOTE: MVP/POC offers single product, but this allows for extensibility:
    const productsList = this.props.products.map(
      (productsArr) => {
        return (
          <Col xs={12} sm={6} md={4} key={productsArr._id}>
            <ProductItem
              _id={productsArr._id}
              name={productsArr.name}
              description={productsArr.description}
              ingredients={productsArr.ingredients}
              price={productsArr.price}
            />
          </Col>
        )
      })
    return (
      <Grid>
        <Row>
          <Cart />
        </Row>
        <Row>
          <Col xs={12} sm={6}>
            <ProductsForm />
          </Col>
          {productsList}
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products.products
  }
}

export default connect(mapStateToProps, { getProducts })(ProductsList)