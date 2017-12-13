import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getAuth } from '../actions/authActions'
import { getCart } from '../actions/cartActions'

import Footer from './Footer'
import Header from './Header'

class Main extends Component {
  componentDidMount () {
    this.props.getAuth()
    this.props.getCart()
  }

  render () {
    return (
      <div>
        <Header cartItemsNumber={this.props.totalQty} />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
    totalQty: state.cart.totalQty
  }
}

export default connect(mapStateToProps, { getAuth, getCart })(Main)
