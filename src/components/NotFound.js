import React, { Component } from 'react'
import { Link } from 'react-router'

class NotFound extends Component {
  render () {
    return (
      <div>
        <h5>404... we couldn't find what you're looking for.</h5>
        <h6>go back to <Link className='nav-link' to='/'>s u m m v s</Link></h6>
      </div>
    )
  }
}

export default NotFound
