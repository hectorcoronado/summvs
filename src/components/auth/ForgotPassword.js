import React, { Component } from 'react'
import { reduxForm } from 'redux-form'

import { resetErrors, forgotPassword } from '../../actions/authActions'

class ForgotPassword extends Component {
  componentWillMount () {
    this.props.resetErrors()
  }

  handleFormSubmit ({ email }) {
    this.props.resetErrors()
    this.props.forgotPassword({ email })
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
    const { handleSubmit, fields: { email } } = this.props

    return (
      <div className='container'>
        <div className='col-xs-8 col-xs-offset-2 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4'>
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <fieldset className='form-group'>
              <label>email:</label>
              <input {...email} className='form-control' />
            </fieldset>
            <button action='submit' className='btn btn-link align-left'>reset password</button>
            {this.renderAlert()}
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    errorMessage: state.auth.error,
    successMessage: state.auth.success
  }
}

export default reduxForm({
  form: 'forgotPassword',
  fields: [
    'email'
  ]
}, mapStateToProps, { resetErrors, forgotPassword })(ForgotPassword)
