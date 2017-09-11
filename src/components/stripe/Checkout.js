import React, { Component } from 'react'
import { connect } from 'react-redux'

import { STRIPE_PUBLIC_KEY } from './stripeConstants'

class Checkout extends Component {
  checkoutHandler () {
    const configureStripe =
      StripeCheckout.configure({
        key: STRIPE_PUBLIC_KEY,
        locale: 'auto'
      })

    const handleToken = (token) => {
      console.log('token:')
      console.log(token)
      fetch('api/charge', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(token)
      })
      .then(output => {
        if (output.status === 'succeeded') {
          console.log('purchase complete.')
        }
      })
    }

    configureStripe.open({
      name: 'summvs',
      description: 'soap',
      token: handleToken
    })
  }

  render () {
    return (
      <div>
        {this.checkoutHandler()}
      </div>
    )
  }
}

export default connect()(Checkout)
