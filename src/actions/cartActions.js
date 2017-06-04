import {
  ADD_TO_CART
} from './types'

export function addToCart(product) {
  return {
    type: ADD_TO_CART,
    payload: product
  }
}
