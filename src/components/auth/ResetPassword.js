import React, { Component } from 'react'
import { Panel, Well } from 'react-bootstrap'
import { reduxForm } from 'redux-form'

import { resetErrors, resetPassword } from '../../actions/authActions'

class ResetPassword extends Component {
  componentWillMount () {
    this.props.resetErrors()
  }

  handleFormSubmit (resetPassword) {
    let resetPasswordToken = this.props.params.resetPasswordToken
    this.props.resetPassword({ resetPassword, resetPasswordToken })

    return (
      <div>
        Thank you, your password has been reset. You will be redirected to your account page shortly.
      </div>
    )
  }

  renderAlert () {
    if (this.props.errorMessage) {
      return (
        <div className='error'>
          {this.props.errorMessage}
        </div>
      )
    }
  }

  render () {
    // handleSubmit comes from reduxForm, as do the fields (def'd below)
    const { handleSubmit, fields: { resetPassword, confirmPassword } } = this.props

    return (
      <Well>
        <Panel>
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <fieldset className='form-group'>
              <label>New Password:</label>
              <input {...resetPassword} className='form-control' />
            </fieldset>
            <fieldset className='form-group'>
              <label>Confirm Password:</label>
              <input {...confirmPassword} className='form-control' />
            </fieldset>
            <div>
              <button action='submit' className='btn btn-primary'>Update Password</button>
              {confirmPassword.touched && confirmPassword.error && <div className='error'>{confirmPassword.error}</div>}
              {this.renderAlert()}
            </div>
          </form>
        </Panel>
      </Well>
    )
  }
}

function validate (formProps) {
  // will contain any errors found in form fields:
  const errors = {}

  if (formProps.resetPassword !== formProps.confirmPassword) {
    errors.confirmPassword = 'New Password and Confirm Password fields must match.'
  }
  return errors
}

function mapStateToProps (state) {
  return { errorMessage: state.auth.error }
}

export default reduxForm({
  form: 'resetPassword',
  fields: [
    'resetPassword',
    'confirmPassword'
  ],
  validate
}, mapStateToProps, { resetErrors, resetPassword })(ResetPassword)
