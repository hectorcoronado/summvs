import axios from 'axios'
import { browserHistory } from 'react-router'

import {
  AUTH_ERROR,
  AUTH_SUCCESS,
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
        dispatch({
          type: AUTH_USER,
          payload: response.data.email
        })
        // - save jwt:
        localStorage.setItem('token', response.data.token)
        // - redirect:
        browserHistory.push('/cart')
      })
      .catch(() => {
        // req bad? show error:
        dispatch(authError('incorrect email or password.'))
      })
  }
}

export function signoutUser () {
  localStorage.removeItem('token')
  return { type: UNAUTH_USER }
}

export function signupUser ({ email, password }) {
  return (dispatch) => {
    axios.post('/api/signup', { email, password })
      .then(response => {
        dispatch({
          type: AUTH_USER,
          payload: response.data.email
        })
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
        }, 3000)
      })
  }
}

export function forgotPassword (email) {
  return (dispatch) => {
    axios.post('/api/forgot', email)
      .then(response => {
        dispatch(authSuccess(response.data.success))
      })
      .catch(error =>
        dispatch(authError(error.response.data.error))
      )
  }
}

export function resetPassword ({ resetPassword, resetPasswordToken }) {
  return (dispatch) => {
    axios.patch(`/api/reset/${resetPasswordToken}`, resetPassword)
      .then(response => {
        dispatch(authSuccess(response.data.success))
        dispatch({
          type: AUTH_USER,
          payload: response.data.email
        })
        localStorage.setItem('token', response.data.token)
        window.setTimeout(() => {
          browserHistory.push('/account')
        }, 3000)
      })
      .catch(error =>
        dispatch(authError(error.response.data.error)))
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

export function authSuccess (success) {
  return {
    type: AUTH_SUCCESS,
    payload: success
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
