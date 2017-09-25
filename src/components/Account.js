import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchMessage } from '../actions/authActions'

class Account extends Component {
  componentWillMount () {
    this.props.fetchMessage()
  }

  render () {
    return (
      <h6>this is the account page...</h6>
    )
  }
}

export default connect(null, { fetchMessage })(Account)
