import React, { Component } from 'react'
import { connect } from 'react-redux'

import Footer from './Footer'
import Menu from './Menu'

class Main extends Component {
  render () {
    return (
      <div>
        <Menu cartItemsNumber={this.props.totalQty} />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    totalQty: state.cart.totalQty
  }
}

export default connect(mapStateToProps)(Main)
