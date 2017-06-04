import {
  ADD_TO_CART
} from '../actions/types'

const INITIAL_STATE = {
  cart: []
}

export default function cartReducers (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        cart: [ ...state.cart, ...action.payload ]
      }
      break
    default:
      return state
  }
}
