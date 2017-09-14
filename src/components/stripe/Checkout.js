import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { STRIPE_PUBLIC_KEY } from './stripeConstants'
import { browserHistory } from 'react-router'

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
    const amount = this.props.totalAmount
    const fromUSDToCent = (amount) => amount * 100
    const handleToken = (token) => {
      let payload = {
        token: token,
        amount: fromUSDToCent(amount)
      }
      console.log('handleToken token: ', token)
      fetch('api/charge', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
      })
      .then(output => {
        if (output.status === 200) {
          browserHistory.push('/complete')
        }
      })
      .catch(err => {
        console.log('Purchase failed:', err)
      })
    }

    this.stripeHandler.open({
      name: 'summvs',
      description: this.props.product.join(', '),
      amount: fromUSDToCent(amount),
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
