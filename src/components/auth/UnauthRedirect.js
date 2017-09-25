import React, { Component } from 'react'
import { Link } from 'react-router'

class UnauthRedirect extends Component {
  render () {
    return (
      <div>
        <h5>you must be signed in to access this content.</h5>
        <h6>please <Link to={`/signin`}>sign in</Link> or <Link to={`/signup`}>sign up</Link>.</h6>
      </div>
    )
  }
}

export default UnauthRedirect
