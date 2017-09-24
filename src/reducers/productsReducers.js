import {
  POST_PRODUCT,
  POST_PRODUCT_REJECTED,
  GET_PRODUCTS,
  UPDATE_PRODUCTS,
  DELETE_PRODUCT,
  RESET_BUTTON
} from '../actions/types'

const INITIAL_STATE = {
  products: []
}

export default function productsReducers (state = INITIAL_STATE, action) {
  switch (action.type) {
    case POST_PRODUCT:
      return {
        ...state,
        products: [...state.products, ...action.payload],
        msg: 'Saved! Click to continue.',
        style: 'success'
      }

    case POST_PRODUCT_REJECTED:
      return {
        ...state,
        msg: 'Please try again',
        style: 'danger'
      }

    case GET_PRODUCTS:
      return { ...state, products: [...action.payload] }

    case UPDATE_PRODUCTS:
      const currentProductToUpdate = [...state.products, ...action.payload]
      const indexToUpdate = currentProductToUpdate.findIndex(
        (product) => { return product._id === action.payload._id })
      const updatedProduct = {
        ...currentProductToUpdate[indexToUpdate],
        inventory: action.payload.inventory
      }
      return {
        products: [
          ...currentProductToUpdate.slice(0, indexToUpdate),
          updatedProduct,
          ...currentProductToUpdate.slice(indexToUpdate + 1)
        ]
      }

    case DELETE_PRODUCT:
      const currentProductToDelete = [...state.products]
      const indexToDelete = currentProductToDelete.findIndex(
        (product) => { return product._id.toString() === action.payload })
      return {
        products: [
          ...currentProductToDelete.slice(0, indexToDelete), ...currentProductToDelete.slice(indexToDelete + 1)
        ]
      }

    case RESET_BUTTON:
      return { ...state, msg: null, style: 'primary' }

    default:
      return state
  }
}
