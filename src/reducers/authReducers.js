import {
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_USER,
  GET_AUTH,
  UNAUTH_USER
} from '../actions/types'

const INITIAL_STATE = {
  error: null
}

export default function authReducers (state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_ERROR:
      return { ...state, error: action.payload }

    case AUTH_SUCCESS:
      return { ...state, success: action.payload }

    case AUTH_USER:
      if (action.payload) {
        return {
          ...state,
          authenticated: true,
          email: action.payload.email,
          _id: action.payload._id,
          error: null
        }
      } else {
        return {
          ...state,
          authenticated: true,
          error: null
        }
      }

    case GET_AUTH:
      return {
        ...state,
        _id: action.payload
      }

    case UNAUTH_USER:
      return {
        ...state,
        authenticated: false,
        email: null,
        _id: null
      }

    default:
      return state
  }
}
