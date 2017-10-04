import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col, Grid, Row } from 'react-bootstrap'
import uniqid from 'uniqid'

import { getProducts } from '../actions/productsActions'

import ProductItem from './ProductItem'

class ProductsList extends Component {
  componentDidMount () {
    this.props.getProducts()
  }

  render () {
    const productsList = this.props.products.map(
      (productsArr) => {
        return (
          <Col xs={10} xsOffset={1} sm={6} smOffset={3} key={uniqid()}>
            <ProductItem
              _id={productsArr._id}
              name={productsArr.name}
              image={productsArr.image}
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
