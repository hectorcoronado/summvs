import React, { Component } from 'react'
import { Panel, Well } from 'react-bootstrap'
import { reduxForm } from 'redux-form'

import { resetErrors, resetPassword } from '../../actions/authActions'

class ResetPassword extends Component {
  componentWillMount () {
    this.props.resetErrors()
  }

  handleFormSubmit (password) {
    let resetPasswordToken = this.props.params.resetPasswordToken
    this.props.resetPassword({ password, resetPasswordToken })
  }

  renderAlert () {
    if (this.props.errorMessage) {
      return (
        <div className='alert alert-danger'>
          {this.props.errorMessage}
        </div>
      )
    }
  }

  render () {
    // handleSubmit comes from reduxForm, as do the fields (def'd below)
    const { handleSubmit, fields: { password, confirmPassword } } = this.props

    return (
      <Well>
        <Panel>
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <fieldset className='form-group'>
              <label>New Password:</label>
              <input {...password} className='form-control' />
            </fieldset>
            <fieldset className='form-group'>
              <label>Confirm Password:</label>
              <input {...confirmPassword} className='form-control' />
            </fieldset>
            {this.renderAlert()}
            <button action='submit' className='btn btn-primary'>Update Password</button>
          </form>
        </Panel>
      </Well>
    )
  }
}

function mapStateToProps (state) {
  return { errorMessage: state.auth.error }
}

export default reduxForm({
  form: 'resetPassword',
  fields: [
    'password',
    'confirmPassword'
  ]
}, mapStateToProps, { resetErrors, resetPassword })(ResetPassword)
