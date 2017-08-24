import React, { Component } from 'react'
import { Panel, Well } from 'react-bootstrap'
import { reduxForm } from 'redux-form'

import { resetErrors, forgotPassword } from '../../actions/authActions'

class ForgotPassword extends Component {
  componentWillMount () {
    this.props.resetErrors()
  }

  handleFormSubmit ({ email }) {
    this.props.forgotPassword({ email })
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
    const { handleSubmit, fields: { email } } = this.props

    return (
      <Well>
        <Panel>
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <fieldset className='form-group'>
              <label>Email:</label>
              <input {...email} className='form-control' />
            </fieldset>
            {this.renderAlert()}
            <button action='submit' className='btn btn-primary'>Reset Password</button>
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
  form: 'forgotPassword',
  fields: [
    'email'
  ]
}, mapStateToProps, { resetErrors, forgotPassword })(ForgotPassword)
