import axios from 'axios'

import {
  POST_PRODUCT,
  POST_PRODUCT_REJECTED,
  GET_PRODUCTS,
  GET_PRODUCTS_REJECTED,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  DELETE_PRODUCT_REJECTED,
  RESET_BUTTON
} from './types'

export function postProducts (product) {
  return (dispatch) => {
    axios.post('/api/products', product)
      .then((response) => {
        dispatch({
          type: POST_PRODUCT,
          payload: response.data
        })
      })
      .catch((err) => {
        dispatch({
          type: POST_PRODUCT_REJECTED,
          payload: err
        })
      })
  }
}

export function getProducts () {
  return (dispatch) => {
    axios.get('/api/products')
      .then((response) => {
        dispatch({
          type: GET_PRODUCTS,
          payload: response.data
        })
      })
      .catch((err) => {
        dispatch({
          type: GET_PRODUCTS_REJECTED,
          payload: err
        })
      })
  }
}

export function updateProducts (_id, quantity, products) {
  const currentProductToUpdate = products

  const indexToUpdate = currentProductToUpdate.findIndex(
    (product) => { return product._id === _id })

  const updatedProduct = {
    ...currentProductToUpdate[indexToUpdate],
    inventory: currentProductToUpdate[indexToUpdate].inventory - quantity
  }

  return (dispatch) => {
    return axios.patch(`/api/products/${_id}`, updatedProduct)
      .then((response) => {
        dispatch({
          type: UPDATE_PRODUCT,
          payload: response
        })
      })
      .catch((err) => {
        console.log('Errors:')
        console.log(err)
      })
  }
}

export function deleteProduct (_id) {
  return (dispatch) => {
    axios.delete(`/api/products/${_id}`)
      .then((response) => {
        dispatch({
          type: DELETE_PRODUCT,
          payload: _id
        })
      })
      .catch((err) => {
        dispatch({
          type: DELETE_PRODUCT_REJECTED,
          payload: err
        })
      })
  }
}

// reset form button:
export function resetButton () {
  return {
    type: RESET_BUTTON
  }
}
