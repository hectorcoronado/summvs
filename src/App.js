import { createStore } from 'redux'

const reducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case 'POST_PRODUCT':
      return { products: [...state.products, ...action.payload] }
      break
    case 'DELETE_PRODUCT':
      const currentProductToDelete = [...state.products]
      const indexToDelete = currentProductToDelete.findIndex(
        (product) => { return product.id === action.payload.id })
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

const store = createStore(reducer)

store.subscribe(() => {
  console.log('Current state is: ', store.getState())
})

store.dispatch({
  type: 'POST_PRODUCT',
  payload: [{
    id: 1,
    name: 'Soap',
    image: 'Image',
    price: 10,
    description: 'Soap',
    ingredients: ['Soap'],
    inventory: 1
  },
  {
    id: 2,
    name: 'SoapTwo',
    image: 'ImageTwo',
    price: 15,
    description: 'SoapTwo',
    ingredients: ['SoapTwo'],
    inventory: 1
  }]
})

store.dispatch({
  type: 'POST_PRODUCT',
  payload: [{
    id: 3,
    name: 'Soap3',
    image: 'Image3',
    price: 12,
    description: 'Soap3',
    ingredients: ['Soap3'],
    inventory: 1
  }]
})

// delete:
store.dispatch({
  type: 'DELETE_PRODUCT',
  payload: {
    id: 3
  }
})
