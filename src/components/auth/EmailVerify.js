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
        <h6>This is the Email Verification page...</h6>
        <h2>{this.props.params.validationString}</h2>
      </div>
    )
  }
}

export default connect(null, { verifyUserEmail })(EmailVerify)
