import axios from 'axios'

import {
  POST_PRODUCT,
  POST_PRODUCT_REJECTED,
  GET_PRODUCTS,
  GET_PRODUCTS_REJECTED,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_REJECTED,
  DELETE_PRODUCT,
  DELETE_PRODUCT_REJECTED
} from './types'

export function postProducts (product) {
  return (dispatch) => {
    axios.post('/products', product)
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
    axios.get('/products')
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

export function updateProduct (product) {
  return {
    type: UPDATE_PRODUCT,
    payload: product
  }
}

export function deleteProduct (_id) {
  return (dispatch) => {
    axios.delete(`/products/${_id}`)
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
