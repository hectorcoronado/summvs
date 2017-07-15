import React, { Component } from 'react'
import { connect } from 'react-redux'

import { signoutUser } from '../../actions/authActions'

class Signout extends Component {
  componentWillMount () {
    this.props.signoutUser()
  }
  render () {
    return (
      <div>
        Come back soon!
      </div>
    )
  }
}

export default connect(null, { signoutUser })(Signout)
