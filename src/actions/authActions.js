import axios from 'axios'
import { browserHistory } from 'react-router'

import {
  AUTH_ERROR,
  AUTH_USER,
  UNAUTH_USER
} from './types'

const localStorage = window.localStorage

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
        // req bad? show error:
        dispatch(authError('Incorrect email or password'))
      })
  }
}

export function signoutUser () {
  localStorage.removeItem('token')
  return { type: UNAUTH_USER }
}

export function signupUser ({firstName, lastName, password, email, address, city, state, zip, country}) {
  return (dispatch) => {
    axios.post('/api/signup', {firstName, lastName, password, email, address, city, state, zip, country})
      .then(response => {
        dispatch({ type: AUTH_USER })
        localStorage.setItem('token', response.data.token)
        browserHistory.push('/cart')
      })
      .catch(error =>
        dispatch(authError(error.response.data.error)))
  }
}

export function verifyUserEmail ({validationString}) {
  return (dispatch) => {
    axios.patch(`/api/signup/${validationString}`, {validationString})
      .then(response => {
        window.setTimeout(() => {
          browserHistory.push('/account')
        }, 3500)
      })
  }
}

export function forgotPassword (email) {
  return (dispatch) => {
    axios.post('/api/forgot', email)
      .then(response => {
        console.log(`email at authActions is:`)
        console.log(email)
      })
  }
}

export function resetErrors () {
  return dispatch => dispatch(authError(null))
}

export function authError (error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

// trivial ex to use backend auth:
export function fetchMessage () {
  return (dispatch) => {
    axios.get('/api/testauth', {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        console.log(response)
      })
  }
}
