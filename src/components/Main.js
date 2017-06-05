import React, { Component } from 'react'

import Footer from './Footer'
import Menu from './Menu'

class Main extends Component {
  render () {
    return (
      <div>
        <Menu />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

export default Main
