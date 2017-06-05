import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Button, ButtonGroup, Col, Label, Panel, Row, Well
} from 'react-bootstrap'

class Cart extends Component {
  renderEmpty () {
    return (
      <div>
        Your cart is empty.
      </div>
    )
  }

  renderCart () {
    const cartItemsList = this.props.cart.map(
      (cartArr) => {
        return (
          <Panel key={cartArr._id}>
            <Row>
              <Col xs={12} sm={4}>
                <h6>{cartArr.name}</h6><span>     </span>
              </Col>
              <Col xs={12} sm={2}>
                <h6>USD {cartArr.price}</h6>
              </Col>
              <Col xs={6} sm={2}>
                <h6>Qty: <Label bsStyle='success'></Label></h6>
              </Col>
              <Col xs={6} sm={2}>
                <ButtonGroup style={{minWidth: '300px'}}>
                  <Button bsStyle='default' bsSize='xsmall'>-</Button>
                  <Button bsStyle='default' bsSize='xsmall'>+</Button>
                </ButtonGroup>
                <Button bsStyle='link' bsSize='small'>Remove</Button>
              </Col>
            </Row>
          </Panel>
        )
      }
    )
    return (
      <Panel header='Cart'>
        {cartItemsList}
      </Panel>
    )
  }
  render () {
    if (this.props.cart[0]) {
      return this.renderCart()
    } else {
      return this.renderEmpty()
    }
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart
  }
}

export default connect(mapStateToProps)(Cart)
