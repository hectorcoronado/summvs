import React, { Component } from 'react'
import { Button, Col, Row, Well } from 'react-bootstrap'

import IngredientList from './IngredientList'

class ProductItem extends Component {
  render () {
    return (
      <Well>
        <Row>
          <Col xs={12}>
            <h6>{this.props.name}</h6>
            <p>{this.props.description}</p>
            <IngredientList ingredients={this.props.ingredients} />
            <h6>USD {this.props.price}</h6>
            <Button bsStyle='primary'>Add To Cart</Button>
          </Col>
        </Row>
      </Well>
    )
  }
}

export default ProductItem
