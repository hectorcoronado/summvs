import React, { Component } from 'react'
import { reduxForm } from 'redux-form'

import { resetErrors, resetPassword } from '../../actions/authActions'

class ResetPassword extends Component {
  componentWillMount () {
    this.props.resetErrors()
  }

  handleFormSubmit (resetPassword) {
    this.props.resetErrors()
    let resetPasswordToken = this.props.params.resetPasswordToken
    this.props.resetPassword({ resetPassword, resetPasswordToken })
  }

  renderAlert () {
    const { errorMessage, successMessage } = this.props

    if (errorMessage) {
      return (
        <div className='error'>
          {errorMessage}
        </div>
      )
    }

    if (successMessage) {
      return (
        <div className='success'>
          {successMessage}
        </div>
      )
    }
  }

  render () {
    // handleSubmit comes from reduxForm, as do the fields (def'd below)
    const { handleSubmit, fields: { resetPassword, confirmPassword } } = this.props

    return (
      <div className='container'>
        <div className='col-xs-8 col-xs-offset-2 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4'>
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <fieldset className='form-group'>
              <label>new password:</label>
              <input {...resetPassword} className='form-control' />
            </fieldset>
            <fieldset className='form-group'>
              <label>confirm password:</label>
              <input {...confirmPassword} className='form-control' />
            </fieldset>
            <div>
              <button action='submit' className='btn btn-link align-left'>update password</button>
              {confirmPassword.touched && confirmPassword.error && <div className='error'>{confirmPassword.error}</div>}
              {this.renderAlert()}
            </div>
          </form>
        </div>
      </div>
    )
  }
}

function validate (formProps) {
  // will contain any errors found in form fields:
  const errors = {}

  if (formProps.resetPassword !== formProps.confirmPassword) {
    errors.confirmPassword = 'new password & confirm password fields must match.'
  }
  return errors
}

function mapStateToProps (state) {
  return {
    errorMessage: state.auth.error,
    successMessage: state.auth.success
  }
}

export default reduxForm({
  form: 'resetPassword',
  fields: [
    'resetPassword',
    'confirmPassword'
  ],
  validate
}, mapStateToProps, { resetErrors, resetPassword })(ResetPassword)
