import {
  AUTH_ERROR,
  AUTH_USER,
  GET_AUTH,
  UNAUTH_USER
} from '../actions/types'

const INITIAL_STATE = {}

export default function authReducers (state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_ERROR:
      return { ...state, error: action.payload }

    case AUTH_USER:
      return { ...state, authenticated: true }

    case GET_AUTH:
      return { ...state, authenticated: isAuthenticated(action.payload) }

    case UNAUTH_USER:
      return { ...state, authenticated: false }

    default:
      return state
  }
}

function isAuthenticated (token) {
  return token !== undefined
}
