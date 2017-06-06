import {
  POST_PRODUCT,
  GET_PRODUCTS,
  UPDATE_PRODUCT,
  DELETE_PRODUCT
} from '../actions/types'

const INITIAL_STATE = {
  products: []
}

export default function productsReducers (state = INITIAL_STATE, action) {
  switch (action.type) {
    case POST_PRODUCT:
      return { products: [...state.products, ...action.payload] }
      break

    case GET_PRODUCTS:
      return { ...state, products: [...action.payload] }
      break

    case UPDATE_PRODUCT:
      const currentProductToUpdate = [...state.products]
      const indexToUpdate = currentProductToUpdate.findIndex(
        (product) => { return product._id === action.payload._id })
      const updatedProduct = {
        ...currentProductToUpdate[indexToUpdate],
        name: action.payload.name
      }
      return {
        products: [
          ...currentProductToUpdate.slice(0, indexToUpdate),
          updatedProduct,
          ...currentProductToUpdate.slice(indexToUpdate + 1)
        ]
      }
      break

    case DELETE_PRODUCT:
      const currentProductToDelete = [...state.products]
      const indexToDelete = currentProductToDelete.findIndex(
        (product) => { return product._id.toString() === action.payload })
      return {
        products: [
          ...currentProductToDelete.slice(0, indexToDelete), ...currentProductToDelete.slice(indexToDelete + 1)
        ]
      }
      break

    default:
      return state
  }
}
