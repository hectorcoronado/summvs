import React, { Component } from 'react'
import { Panel, Well } from 'react-bootstrap'
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
        <div className='alert alert-danger'>
          {this.props.errorMessage}
        </div>
      )
    }
  }

  render () {
    // handleSubmit comes from reduxForm, as do the fields (def'd below)
    const { handleSubmit, fields: { email, password } } = this.props

    return (
      <Well>
        <Panel>
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <fieldset className='form-group'>
              <label>Email:</label>
              <input {...email} className='form-control' />
            </fieldset>
            <fieldset className='form-group'>
              <label>Password:</label>
              <input {...password} type='password' className='form-control' />
            </fieldset>
            {this.renderAlert()}
            <button action='submit' className='btn btn-primary'>Sign In</button>
          </form>
          <Link to='/forgot'>Forgot Password...?</Link>
        </Panel>
      </Well>
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
