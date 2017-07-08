import {
  AUTH_USER,
  UNAUTH_USER
} from '../actions/types'

const INITIAL_STATE = {}

export default function authReducers (state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: true }
      break
    case UNAUTH_USER:
      return { ...state, authenticated: false }
      break;
  }
  return state
}
