import {
  ADD_TO_CART,
  EMPTY_CART,
  GET_CART,
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

    case GET_CART:
      return {
        ...state,
        cart: action.payload,
        totalAmount: totals(action.payload).amount,
        totalQty: totals(action.payload).qty
      }

    case UPDATE_CART:
      return {
        ...state,
        cart: action.payload,
        totalAmount: totals(action.payload).amount,
        totalQty: totals(action.payload).qty
      }

    case DELETE_CART_ITEM:
      return {
        ...state,
        cart: action.payload,
        totalAmount: totals(action.payload).amount,
        totalQty: totals(action.payload).qty
      }

    case EMPTY_CART:
      return {
        ...state,
        cart: [],
        totalAmount: null,
        totalQty: null
      }

    default:
      return state
  }
}

// func used to calc totals for all cart reducers:
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
