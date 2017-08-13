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
      <div>
        <h5>Thank you, your email is now verified.</h5>
        <h6>You will automatically be taken to your Account page very briefly...</h6>
      </div>
    )
  }
}

export default connect(null, { verifyUserEmail })(EmailVerify)
