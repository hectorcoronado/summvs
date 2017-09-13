import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { STRIPE_PUBLIC_KEY } from './stripeConstants'

class Checkout extends Component {
  constructor (props) {
    super(props)

    this.onStripeUpdate = this.onStripeUpdate.bind(this)
    this.loadStripe = this.loadStripe.bind(this)
  }

  loadStripe (onload) {
    if (!window.StripeCheckout) {
      const script = document.createElement('script')
      script.onload = () => {
        console.log('Stripe script loaded')
        onload()
      }
      script.src = 'https://checkout.stripe.com/checkout.js'
      document.head.appendChild(script)
    } else {
      onload()
    }
  }

  componentDidMount () {
    this.loadStripe(() => {
      this.stripeHandler = window.StripeCheckout.configure({
        key: STRIPE_PUBLIC_KEY,
        locale: 'auto'
      })
    })
  }

  componentWillUnmount () {
    if (this.stripeHandler) {
      this.stripeHandler.close()
    }
  }

  onStripeUpdate (e) {
    const fetch = window.fetch
    const handleToken = (token) => {
      fetch('api/charge', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(token)
      })
      .then(output => {
        if (output.status === 200) {
          console.log('purchase complete.')
        }
      })
    }

    this.stripeHandler.open({
      name: 'summvs',
      description: 'soap',
      token: handleToken
    })

    e.preventDefault()
  }

  render () {
    return (
      <div>
        <Button
          bsStyle='success'
          bsSize='xsmall'
          onClick={this.onStripeUpdate}
          >
            pay
        </Button>
      </div>
    )
  }
}

export default Checkout
