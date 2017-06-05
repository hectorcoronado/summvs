import React, { Component } from 'react'
import { connect } from 'react-redux'

class ProductsList extends Component {
  render () {
    // NOTE though MVP/POC offers single product, this allows for extensibility:
    const productsList = this.props.products.map(
      (productsArr) => {
        return (
          <div key={productsArr.id}>
            <h2>{productsArr.name}</h2>
            <h2>{productsArr.description}</h2>
            <h2>{productsArr.price}</h2>
          </div>
        )
      })
    return (
      <div>
        <h3>Soaps.</h3>
        {productsList}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products.products
  }
}

export default connect(mapStateToProps)(ProductsList)
