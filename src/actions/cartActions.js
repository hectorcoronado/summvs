import {
  ADD_TO_CART,
  UPDATE_CART,
  DELETE_CART_ITEM
} from './types'

export function addToCart (product) {
  return {
    type: ADD_TO_CART,
    payload: product
  }
}

export function updateCart (_id, unit) {
  return {
    type: UPDATE_CART,
    _id,
    unit
  }
}

export function deleteCartItem (cart) {
  return {
    type: DELETE_CART_ITEM,
    payload: cart
  }
}
