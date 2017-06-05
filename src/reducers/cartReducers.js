import {
  ADD_TO_CART,
  UPDATE_CART,
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

    case UPDATE_CART:
      const currentProductToUpdate = [...state.cart]

      const indexToUpdate = currentProductToUpdate.findIndex(
        (product) => { return product._id === action._id })

      const updatedProduct = {
        ...currentProductToUpdate[indexToUpdate],
        quantity: currentProductToUpdate[indexToUpdate].quantity + action.unit
      }

      let cartUpdate = [
        ...currentProductToUpdate.slice(0, indexToUpdate),
        updatedProduct,
        ...currentProductToUpdate.slice(indexToUpdate + 1)
      ]

      return { ...state, cart: cartUpdate }
      break

    case DELETE_CART_ITEM:
      return { ...state, cart: action.payload }
      break

    default:
      return state
  }
}
