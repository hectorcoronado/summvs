import {
  POST_PRODUCT,
  GET_PRODUCTS,
  UPDATE_PRODUCT,
  DELETE_PRODUCT
} from './types'

export function postProducts (product) {
  return {
    type: POST_PRODUCT,
    payload: product
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

export function deleteProduct (id) {
  return {
    type: DELETE_PRODUCT,
    payload: id
  }
}
