import {
  AUTH_ERROR,
  AUTH_USER,
  UNAUTH_USER
} from '../actions/types'

const INITIAL_STATE = {
  authenticated: isAuthenticated(),
  error: null
}

export default function authReducers (state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_ERROR:
      return { ...state, error: action.payload }

    case AUTH_USER:
      return { ...state, error: '', authenticated: true }

    case UNAUTH_USER:
      return { ...state, authenticated: false }

    default:
      return state
  }
}

function isAuthenticated () {
  return localStorage.getItem('token') !== null
}
