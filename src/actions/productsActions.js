import axios from 'axios'

import {
  POST_PRODUCT,
  POST_PRODUCT_REJECTED,
  GET_PRODUCTS,
  UPDATE_PRODUCT,
  DELETE_PRODUCT
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
          payload: 'There was an error with postProducts'
        })
      })
  }
}

export function getProducts () {
  return {
    type: GET_PRODUCTS
  }
}

export function updateProduct (product) {
  return {
    type: UPDATE_PRODUCT,
    payload: product
  }
}

export function deleteProduct (_id) {
  return {
    type: DELETE_PRODUCT,
    payload: _id
  }
}
