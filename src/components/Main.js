import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getCart } from '../actions/cartActions'

import Footer from './Footer'
import Menu from './Menu'

class Main extends Component {
  componentDidMount () {
    this.props.getCart()
  }
  render () {
    return (
      <div>
        <Menu cartItemsNumber={this.props.totalQty} />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    totalQty: state.cart.totalQty
  }
}

export default connect(mapStateToProps, { getCart })(Main)
