import React, { Component } from 'react'
import { Link } from 'react-router'

class NotFound extends Component {
  render () {
    return (
      <div className='row'>
        <h6 className='col-xs-4 col-xs-offset-4 text-center'>
          404... we couldn't find what you're looking for.
        </h6>
        <h6 className='col-xs-4 col-xs-offset-4 text-center'>
          go back to <Link className='nav-link' to='/'>s u m m v s</Link>
        </h6>
      </div>
    )
  }
}

export default NotFound
