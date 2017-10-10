import React, { Component } from 'react'
import { reduxForm } from 'redux-form'

import { resetErrors, signupUser } from '../../actions/authActions'

class Signup extends Component {
  componentWillMount () {
    this.props.resetErrors()
  }

  handleFormSubmit (formProps) {
    this.props.signupUser(formProps)
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
    const {
      handleSubmit, fields: { email, password, passwordConfirm }
    } = this.props

    return (
      <div className='container'>
        <div className='col-xs-8 col-xs-offset-2 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4'>
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <fieldset className='form-group'>
              <label>email:</label>
              <input className='form-control' type='email' {...email} />
            </fieldset>
            <fieldset className='form-group'>
              <label>password:</label>
              <input className='form-control' type='password' {...password} />
            </fieldset>
            <fieldset className='form-group'>
              <label>confirm password:</label>
              <input className='form-control' type='password' {...passwordConfirm} />
            </fieldset>
            <button action='submit' className='btn btn-link align-left'>sign up</button>
            {email.touched && email.error && <div className='error'>{email.error}</div>}
            {password.touched && password.error && <div className='error'>{password.error}</div>}
            {passwordConfirm.touched && passwordConfirm.error && <div className='error'>{passwordConfirm.error}</div>}
            {this.renderAlert()}
          </form>
        </div>
      </div>
    )
  }
}

function validate (formProps) {
  const errors = {}
  if (!formProps.email) {
    errors.email = 'please enter your email.'
  }

  if (!formProps.password) {
    errors.password = 'please enter a password.'
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.passwordConfirm = 'password & confirm password fields must match.'
  }
  return errors
}

function mapStateToProps (state) {
  return { errorMessage: state.auth.error }
}

export default reduxForm({
  form: 'signup',
  fields: [
    'email',
    'password',
    'passwordConfirm'
  ],
  validate
}, mapStateToProps, { resetErrors, signupUser })(Signup)
