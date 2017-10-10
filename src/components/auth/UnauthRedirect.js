import React, { Component } from 'react'
import { Link } from 'react-router'

class UnauthRedirect extends Component {
  render () {
    return (
      <div className='row'>
        <h6 className='col-xs-4 col-xs-offset-4 text-center'>
          you must be signed in to access this content.
        </h6>
        <h6 className='col-xs-4 col-xs-offset-4 text-center'>
          please <Link to={`/signin`}>sign in</Link> or <Link to={`/signup`}>sign up</Link>.
        </h6>
      </div>
    )
  }
}

export default UnauthRedirect
