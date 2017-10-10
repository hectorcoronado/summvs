import React, { Component } from 'react'
import { connect } from 'react-redux'

import { verifyUserEmail } from '../../actions/authActions'

class EmailVerify extends Component {
  componentDidMount () {
    let validationString = this.props.params.validationString
    this.props.verifyUserEmail({validationString: validationString})
  }

  render () {
    return (
      <div className='row'>
        <h6 className='col-xs-4 col-xs-offset-4 text-center'>
          Thank you, your email is now verified.
        </h6>
        <h6 className='col-xs-4 col-xs-offset-4 text-center'>
          You will automatically be taken to your Account page very briefly...
        </h6>
      </div>
    )
  }
}

export default connect(null, { verifyUserEmail })(EmailVerify)
