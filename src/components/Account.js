import moment from 'moment'
import React, { Component } from 'react'
import {
  Col, Panel, Row
} from 'react-bootstrap'
import { connect } from 'react-redux'

import { getOrders } from '../actions/ordersActions'

class Account extends Component {
  componentWillMount () {
    this.props.getOrders()
  }

  renderEmpty () {
    return (
      <div className='row'>
        <h6 className='col-xs-4 col-xs-offset-4 text-center'>
          you have made no purchases.
        </h6>
      </div>
    )
  }

  formatDate (date) {
    return moment(date).format('DD MMM YYYY').toLowerCase()
  }

  renderItems (items) {
    const itemsList = items.map(
      (item) => {
        return (
          <div
            key={item.product}>{item.name} | qty: {item.quantity} | usd: {item.price}</div>
        )
      }
    )
    return itemsList
  }

  renderOrders () {
    const userOrders = this.props.orders.filter((order) => {
      return this.props.auth._id === order.user
    })
    const ordersList = userOrders.map(
      (ordersArr) => {
        const { createdOn, _id, items } = ordersArr
        return (
          <Panel key={_id}>
            <Row>
              <Col xs={6}>
                <h6>date: {this.formatDate(createdOn)}</h6>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <h6>{this.renderItems(items)}</h6>
              </Col>
            </Row>
          </Panel>
        )
      }, this
    )

    return (
      <div className='container'>
        <Col xs={10} xsOffset={1} sm={8} smOffset={2} md={6} mdOffset={3}>
          <h6 className='text-center'>
            here is your order history:
          </h6>
          <div>{ordersList}</div>
        </Col>
      </div>
    )
  }

  render () {
    if (this.props.orders[0]) {
      return this.renderOrders()
    } else {
      return this.renderEmpty()
    }
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    orders: state.orders.orders
  }
}

export default connect(mapStateToProps, { getOrders })(Account)
