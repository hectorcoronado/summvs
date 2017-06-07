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

export function updateCart (_id, unit, cart) {
  const currentProductToUpdate = cart

  const indexToUpdate = currentProductToUpdate.findIndex(
    (product) => { return product._id === _id })

  const updatedProduct = {
    ...currentProductToUpdate[indexToUpdate],
    quantity: currentProductToUpdate[indexToUpdate].quantity + unit
  }

  let cartUpdate = [
    ...currentProductToUpdate.slice(0, indexToUpdate),
    updatedProduct,
    ...currentProductToUpdate.slice(indexToUpdate + 1)
  ]

  return {
    type: UPDATE_CART,
    payload: cartUpdate
  }
}

export function deleteCartItem (cart) {
  return {
    type: DELETE_CART_ITEM,
    payload: cart
  }
}
