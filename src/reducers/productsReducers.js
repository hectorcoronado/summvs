import {
  POST_PRODUCT,
  GET_PRODUCTS,
  UPDATE_PRODUCT,
  DELETE_PRODUCT
} from '../actions/types'

const INITIAL_STATE = {
  products: [{
    _id: 1,
    name: 'Soap',
    image: 'Image',
    price: 10,
    description: 'Simple Soap',
    ingredients: ['Soap'],
    inventory: 1
  },
  {
    _id: 2,
    name: 'SoapTwo',
    image: 'ImageTwo',
    price: 15,
    description: 'Complex Soap',
    ingredients: ['SoapTwo'],
    inventory: 1
  },
  {
    _id: 3,
    name: 'Soap3',
    image: 'Image3',
    price: 12,
    description: 'Soap3',
    ingredients: ['Soap3'],
    inventory: 1
  }]
}

export default function productsReducers (state = INITIAL_STATE, action) {
  switch (action.type) {
    case POST_PRODUCT:
      return { products: [...state.products, ...action.payload] }
      break
    case GET_PRODUCTS:
      return { ...state, products: [...state.products] }
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
        (product) => { return product._id === action.payload._id })
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
