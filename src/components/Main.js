import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getCart } from '../actions/cartActions'
import { getAuth } from '../actions/authActions'

import Footer from './Footer'
import Header from './Header'

class Main extends Component {
  componentDidMount () {
    this.props.getCart()
  }

  componentDidUpdate (prevProps) {
    this.props.getAuth()

    const isAuthenticated = !prevProps.authenticated && this.props.authenticated

    if (isAuthenticated) {
      console.log(`OK, you're good, user!`)
    }
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
  console.log(`Authenticated state: ${state.auth.authenticated}`)
  return {
    authenticated: state.auth.authenticated,
    totalQty: state.cart.totalQty
  }
}

export default connect(mapStateToProps, { getCart, getAuth })(Main)
