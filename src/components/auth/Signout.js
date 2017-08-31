import React, { Component } from 'react'
import { connect } from 'react-redux'

import { signoutUser } from '../../actions/authActions'

class Signout extends Component {
  componentWillMount () {
    this.props.signoutUser()
  }
  render () {
    return (
      <h6>
        Come back, get more soap.
      </h6>
    )
  }
}

export default connect(null, { signoutUser })(Signout)
