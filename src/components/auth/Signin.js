import React, { Component } from 'react'
import { Panel, Well } from 'react-bootstrap'
import { reduxForm } from 'redux-form'

class Signin extends Component {
  handleFormSubmit ({ email, password }) {
    console.log(email, password)
  }

  render () {
    // handleSubmit comes from reduxForm, as do the fields (def'd below)
    const { handleSubmit, fields: { email, password } } = this.props

    return (
      <div>
        <Well>
          <Panel>
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <fieldset className='form-group'>
                <label>Email:</label>
                <input {...email} className='form-control' />
              </fieldset>
              <fieldset className='form-group'>
                <label>Password:</label>
                <input {...password} className='form-control' />
              </fieldset>
              <button action='submit' className='btn btn-primary'>Sign In</button>
            </form>
          </Panel>
        </Well>
      </div>
    )
  }
}

export default reduxForm({
  form: 'signin',
  fields: [
    'email',
    'password'
  ]
})(Signin)
