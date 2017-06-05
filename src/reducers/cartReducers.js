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
      return {
        ...state,
        cart: action.payload,
        totalAmount: totals(action.payload).amount,
        totalQty: totals(action.payload).qty
      }
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

      return {
        ...state,
        cart: cartUpdate,
        totalAmount: totals(cartUpdate).amount,
        totalQty: totals(cartUpdate).qty
      }
      break

    case DELETE_CART_ITEM:
      return {
        ...state,
        cart: action.payload,
        totalAmount: totals(action.payload).amount,
        totalQty: totals(action.payload).qty
      }
      break

    default:
      return state
  }
}

// same func used to calc totals for all cart reducers:
export function totals (payloadArr) {
  const totalAmount = payloadArr.map(
    (cartArr) => { return cartArr.price * cartArr.quantity }
    ).reduce(
      (a, b) => { return a + b }, 0)

  const totalQty = payloadArr.map(
    (qty) => { return qty.quantity }
    ).reduce(
      (a, b) => { return a + b }, 0)

  return {
    amount: totalAmount.toFixed(2),
    qty: totalQty
  }
}
