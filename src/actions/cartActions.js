import axios from 'axios'

import {
  ADD_TO_CART,
  ADD_TO_CART_REJECTED,
  GET_CART,
  GET_CART_REJECTED,
  UPDATE_CART,
  UPDATE_CART_REJECTED,
  DELETE_CART_ITEM,
  DELETE_CART_ITEM_REJECTED
} from './types'

export function addToCart (cart) {
  return (dispatch) => {
    axios.post('/api/cart', cart)
      .then((response) => {
        dispatch({
          type: ADD_TO_CART,
          payload: response.data
        })
      })
      .catch((err) => {
        dispatch({
          type: ADD_TO_CART_REJECTED,
          msg: `Error POSTING to cart: ${err}`
        })
      })
  }
}

export function getCart () {
  return (dispatch) => {
    axios.get('/api/cart')
      .then((response) => {
        dispatch({
          type: GET_CART,
          payload: response.data
        })
      })
      .catch((err) => {
        dispatch({
          type: GET_CART_REJECTED,
          msg: `Error GETTING cart from session: ${err}`
        })
      })
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

  return (dispatch) => {
    axios.put('/api/cart', cartUpdate)
      .then((response) => {
        dispatch({
          type: UPDATE_CART,
          payload: response.data
        })
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_CART_REJECTED,
          msg: `Error UPDATING cart: ${err}`
        })
      })
  }
}

export function deleteCartItem (cart) {
  return (dispatch) => {
    axios.post('/api/cart', cart)
      .then((response) => {
        dispatch({
          type: DELETE_CART_ITEM,
          payload: response.data
        })
      })
      .catch((err) => {
        dispatch({
          type: DELETE_CART_ITEM_REJECTED,
          msg: `Error DELETING item from cart: ${err}`
        })
      })
  }
}
