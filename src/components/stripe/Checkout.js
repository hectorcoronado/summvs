import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { STRIPE_PUBLIC_KEY } from './stripeConstants'
import { connect } from 'react-redux'

import { emptyCart } from '../../actions/cartActions'
import { postOrder } from '../../actions/ordersActions'
import { getProducts, updateProducts } from '../../actions/productsActions'

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
        locale: 'auto',
        shippingAddress: true,
        billingAddress: true,
        zipCode: true
      })
    })
  }

  componentWillUnmount () {
    if (this.stripeHandler) {
      this.stripeHandler.close()
    }
  }

  onStripeUpdate (e) {
    let {
      auth, cart, emptyCart, productNames, postOrder, products, productsIDs, quantities, totalAmount, updateProducts } = this.props

    const IDsAndQtys = productsIDs.reduce((obj, val, i) => {
      obj[val] = quantities[i]
      return obj
    }, {})

    const fetch = window.fetch
    const fromUSDToCent = (amount) => amount * 100
    const handleToken = (token, address) => {
      let payload = {
        address,
        cart,
        IDsAndQtys,
        token,
        amount: fromUSDToCent(totalAmount),
        _id: auth._id
      }

      fetch('api/charge', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
      })
      .then(output => {
        if (output.status === 200) {
          postOrder(payload)
          emptyCart()
          for (let id in IDsAndQtys) {
            updateProducts(id, IDsAndQtys[id], products)
          }
        }
      })
      .catch(err => {
        console.log('Purchase failed:', err)
      })
    }

    this.stripeHandler.open({
      name: 'summvs',
      description: productNames.join(', '),
      amount: fromUSDToCent(totalAmount),
      token: handleToken
    })

    e.preventDefault()
  }

  render () {
    return (
      <div>
        <Button
          bsStyle='link'
          // bsSize='xsmall'
          style={buttonStyle}
          onClick={this.onStripeUpdate}
        >
          pay
        </Button>
      </div>
    )
  }
}

const buttonStyle = {
  background: 'mintcream',
  color: 'black',
  borderColor: 'currentColor'
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    cart: state.cart.cart,
    products: state.products.products
  }
}

export default connect(
  mapStateToProps,
  {emptyCart, getProducts, postOrder, updateProducts}
)(Checkout)
