import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { Link } from 'react-router'

import { resetErrors, signinUser } from '../../actions/authActions'

class Signin extends Component {
  componentWillMount () {
    this.props.resetErrors()
  }

  handleFormSubmit ({ email, password }) {
    this.props.signinUser({ email, password })
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
    const { handleSubmit, fields: { email, password } } = this.props

    return (
      <div className='container'>
        <div className='col-xs-8 col-xs-offset-2 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4'>
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <fieldset className='form-group'>
              <label>email:</label>
              <input {...email} className='form-control' />
            </fieldset>
            <fieldset className='form-group'>
              <label>password:</label>
              <input {...password} type='password' className='form-control' />
            </fieldset>
            {this.renderAlert()}
            <button action='submit' className='btn btn-link align-left'>sign in</button>
          </form>
          <Link to='/forgot'>forgot password...?</Link>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { errorMessage: state.auth.error }
}

export default reduxForm({
  form: 'signin',
  fields: [
    'email',
    'password'
  ]
}, mapStateToProps, { resetErrors, signinUser })(Signin)
