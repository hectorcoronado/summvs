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
      <div className='row'>
        <h6 className='col-xs-4 col-xs-offset-4 text-center'>
          return to <Link className='nav-link' to='/'>s u m m v s</Link>, get more soap.
        </h6>
      </div>
    )
  }
}

export default connect(null, { signoutUser })(Signout)
