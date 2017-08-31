import React, { Component } from 'react'
import { Link } from 'react-router'

class NotFound extends Component {
  render () {
    return (
      <div>
        <h6>404... Sorry, couldn't find what you're looking for!</h6>
        <p>Go back to <Link className='nav-link' to='/'>summvs</Link></p>
      </div>
    )
  }
}

export default NotFound
