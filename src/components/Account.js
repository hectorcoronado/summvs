import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchMessage } from '../actions/authActions'

class Account extends Component {
  componentWillMount () {
    this.props.fetchMessage()
  }

  render () {
    return (
      <div className='row'>
        <h6 className='col-xs-4 col-xs-offset-4 text-center'>
          this is the account page...
        </h6>
      </div>
    )
  }
}

export default connect(null, { fetchMessage })(Account)
