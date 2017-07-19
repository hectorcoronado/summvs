import axios from 'axios'
import { browserHistory } from 'react-router'

import {
  AUTH_ERROR,
  AUTH_USER,
  UNAUTH_USER
} from './types'

export function signinUser ({ email, password }) {
  return (dispatch) => {
    // submit email/pw to server:
    axios.post('/api/signin', { email, password })
      .then(response => {
        // req ok?
        // - update state:
        dispatch({ type: AUTH_USER })
        // - save jwt:
        localStorage.setItem('token', response.data.token)
        // - redirect:
        browserHistory.push('/cart')
      })
      .catch(() => {
        // req bad?
        // - show error:
        dispatch(authError('Incorrect email or password'))
      })
  }
}

export function signoutUser () {
  localStorage.removeItem('token')
  return { type: UNAUTH_USER }
}

export function signupUser ({firstName, lastName, password, email, address, city, state, zip, country}) {
  console.log('First Name is:')
  console.log(firstName)
  return (dispatch) => {
    axios.post('/api/signup', {firstName, lastName, password, email, address, city, state, zip, country})
  }
}

export function authError (error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}
