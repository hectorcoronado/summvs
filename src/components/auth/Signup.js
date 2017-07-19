import React, { Component } from 'react'
import { reduxForm } from 'redux-form'

import { } from '../../actions/authActions'

class Signup extends Component {
  handleSubmit (formProps) {}
  
  render () {
    const {
      handleSubmit,
      fields: { firstName, lastName, email, password, passwordConfirm, address, city, state, zip, country }
    } = this.props

    return (
      <div className='container'>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <div className='row col-sm-6'>
            <fieldset className='form-group'>
              <label>First Name:</label>
              <input className='form-control' {...firstName} />
              {firstName.touched && firstName.error && <div className='error'>{firstName.error}</div>}
            </fieldset>
            <fieldset className='form-group'>
              <label>Last Name:</label>
              <input className='form-control' {...lastName} />
              {lastName.touched && lastName.error && <div className='error'>{lastName.error}</div>}
            </fieldset>
            <fieldset className='form-group'>
              <label>Email:</label>
              <input className='form-control' {...email} />
              {email.touched && email.error && <div className='error'>{email.error}</div>}
            </fieldset>
            <fieldset className='form-group'>
              <label>Password:</label>
              <input className='form-control' type='password' {...password} />
              {password.touched && password.error && <div className='error'>{password.error}</div>}
            </fieldset>
            <fieldset className='form-group'>
              <label>Confirm Password:</label>
              <input className='form-control' type='password' {...passwordConfirm} />
              {passwordConfirm.touched && passwordConfirm.error && <div className='error'>{passwordConfirm.error}</div>}
            </fieldset>
          </div>
          <div className='row col-sm-6'>
            <fieldset className='form-group'>
              <label>Address:</label>
              <input className='form-control' {...address} />
            </fieldset>
            <fieldset className='form-group'>
              <label>City:</label>
              <input className='form-control' {...city} />
            </fieldset>
            <fieldset className='form-group'>
              <label>State:</label>
              <input className='form-control' {...state} />
            </fieldset>
            <fieldset className='form-group'>
              <label>Zip:</label>
              <input className='form-control' {...zip} />
            </fieldset>
            <fieldset className='form-group'>
              <label>Country:</label>
              <input className='form-control' {...country} />
              {country.touched && country.error && <div className='error'>{country.error}</div>}
            </fieldset>
          </div>
          <button action='submit' className='btn btn-primary'>Sign Up</button>
        </form>
      </div>
    )
  }
}

function validate (formProps) {
  // will contain any errors found in form fields:
  const errors = {}

  if (!formProps.firstName) {
    errors.firstName = 'Please enter your first name'
  }

  if (!formProps.lastName) {
    errors.lastName = 'Please enter your last name'
  }

  if (!formProps.email) {
    errors.email = 'Please enter your email.'
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password.'
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please confirm your password.'
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Password and Confirm Password fields must match.'
  }

  if (!formProps.address || !formProps.city || !formProps.state || !formProps.zip || !formProps.country) {
    errors.country = 'Please enter your full address, city, state, zip & country'
  }

  return errors
}

export default reduxForm({
  form: 'signup',
  fields: [
    'firstName',
    'lastName',
    'email',
    'password',
    'passwordConfirm',
    'address',
    'city',
    'state',
    'zip',
    'country'
  ],
  validate
})(Signup)
