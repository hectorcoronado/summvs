import React, { Component } from 'react'
import { Link } from 'react-router'

class UnauthRedirect extends Component {
  render () {
    return (
      <div>
        <h5>You must be signed in to access this content.</h5>
        <h6>Please <Link to={`/signin`}>Sign In</Link> or <Link to={`/signup`}>Sign Up</Link>.</h6>
      </div>
    )
  }
}

export default UnauthRedirect
