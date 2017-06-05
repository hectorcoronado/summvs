import {
  ADD_TO_CART,
  DELETE_CART_ITEM
} from '../actions/types'

const INITIAL_STATE = {
  cart: []
}

export default function cartReducers (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return { ...state, cart: action.payload }
      break
    case DELETE_CART_ITEM:
      return { ...state, cart: action.payload }
      break
    default:
      return state
  }
}
