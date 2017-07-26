import React, { Component } from 'react'

class EmailVerify extends Component {
  render () {
    return (
      <div>
        <h6>This is the Email Verification page...</h6>
        <h2>{this.props.params.validationString}</h2>
      </div>
    )
  }
}

export default EmailVerify
