import React, { Component } from 'react'
import { connect } from 'react-redux'

import { emptyCart } from '../../actions/cartActions'

class PurchaseComplete extends Component {
  componentDidMount () {
    this.props.emptyCart()
  }
  render () {
    return (
      <div>
        Thanks for your purchase.
      </div>
    )
  }
}

export default connect(null, {emptyCart})(PurchaseComplete)
