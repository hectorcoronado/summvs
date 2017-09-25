import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { signoutUser } from '../../actions/authActions'

class Signout extends Component {
  componentWillMount () {
    this.props.signoutUser()
  }
  render () {
    return (
      <h6>
        return to <Link className='nav-link' to='/'>s u m m v s</Link>, get more soap.
      </h6>
    )
  }
}

export default connect(null, { signoutUser })(Signout)
