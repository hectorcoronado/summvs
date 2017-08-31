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
            </fieldset>
            <fieldset className='form-group'>
              <label>Last Name:</label>
              <input className='form-control' {...lastName} />
            </fieldset>
            <fieldset className='form-group'>
              <label>Email:</label>
              <input className='form-control' type='email' {...email} />
            </fieldset>
            <fieldset className='form-group'>
              <label>Password:</label>
              <input className='form-control' type='password' {...password} />
            </fieldset>
            <fieldset className='form-group'>
              <label>Confirm Password:</label>
              <input className='form-control' type='password' {...passwordConfirm} />
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
              <select className='form-control' {...state}>
                <option value='' disabled selected>Select:</option>
                <option value='AL'>AL</option>
                <option value='AK'>AK</option>
                <option value='AR'>AR</option>
                <option value='AZ'>AZ</option>
                <option value='CA'>CA</option>
                <option value='CO'>CO</option>
                <option value='CT'>CT</option>
                <option value='DC'>DC</option>
                <option value='DE'>DE</option>
                <option value='FL'>FL</option>
                <option value='GA'>GA</option>
                <option value='HI'>HI</option>
                <option value='IA'>IA</option>
                <option value='ID'>ID</option>
                <option value='IL'>IL</option>
                <option value='IN'>IN</option>
                <option value='KS'>KS</option>
                <option value='KY'>KY</option>
                <option value='LA'>LA</option>
                <option value='MA'>MA</option>
                <option value='MD'>MD</option>
                <option value='ME'>ME</option>
                <option value='MI'>MI</option>
                <option value='MN'>MN</option>
                <option value='MO'>MO</option>
                <option value='MS'>MS</option>
                <option value='MT'>MT</option>
                <option value='NC'>NC</option>
                <option value='NE'>NE</option>
                <option value='NH'>NH</option>
                <option value='NJ'>NJ</option>
                <option value='NM'>NM</option>
                <option value='NV'>NV</option>
                <option value='NY'>NY</option>
                <option value='ND'>ND</option>
                <option value='OH'>OH</option>
                <option value='OK'>OK</option>
                <option value='OR'>OR</option>
                <option value='PA'>PA</option>
                <option value='RI'>RI</option>
                <option value='SC'>SC</option>
                <option value='SD'>SD</option>
                <option value='TN'>TN</option>
                <option value='TX'>TX</option>
                <option value='UT'>UT</option>
                <option value='VT'>VT</option>
                <option value='VA'>VA</option>
                <option value='WA'>WA</option>
                <option value='WI'>WI</option>
                <option value='WV'>WV</option>
                <option value='WY'>WY</option>
              </select>
            </fieldset>
            <fieldset className='form-group'>
              <label>Zip:</label>
              <input className='form-control' {...zip} />
            </fieldset>
            <fieldset className='form-group'>
              <label>Country:</label>
              <input className='form-control' {...country} />
            </fieldset>
          </div>
          <div>
            <button action='submit' className='btn btn-primary'>Sign Up</button>
            {firstName.touched && firstName.error && <div className='error'>{firstName.error}</div>}
            {lastName.touched && lastName.error && <div className='error'>{lastName.error}</div>}
            {email.touched && email.error && <div className='error'>{email.error}</div>}
            {password.touched && password.error && <div className='error'>{password.error}</div>}
            {passwordConfirm.touched && passwordConfirm.error && <div className='error'>{passwordConfirm.error}</div>}
            {country.touched && country.error && <div className='error'>{country.error}</div>}
            {this.renderAlert()}
          </div>
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

  if (formProps.password !== formProps.passwordConfirm) {
    errors.passwordConfirm = 'Password and Confirm Password fields must match.'
  }

  if (!formProps.address || !formProps.city || !formProps.state || !formProps.zip || !formProps.country) {
    errors.country = 'Please enter your full address, city, state, zip & country'
  }

  return errors
}

function mapStateToProps (state) {
  return { errorMessage: state.auth.error }
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
}, mapStateToProps, { resetErrors, signupUser })(Signup)
