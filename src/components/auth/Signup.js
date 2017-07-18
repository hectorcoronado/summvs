import React, { Component } from 'react'
import { reduxForm } from 'redux-form'

import { } from '../../actions/authActions'

class Signup extends Component {
  render () {
    const {
      handleSubmit,
      fields: { firstName, lastName, email, password, passwordConfirm, address, city, state, zip, country }
    } = this.props
    return (
      <div className='container'>
        <form>
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
              <input className='form-control' {...email} />
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
              <input className='form-control' {...state} />
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
          <button action='submit' className='btn btn-primary'>Sign Up</button>
        </form>
      </div>
    )
  }
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
  ]
})(Signup)
