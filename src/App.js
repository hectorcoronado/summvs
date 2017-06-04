import { createStore } from 'redux'

import reducers from './reducers/index'

import { addToCart } from './actions/cartActions'
import {
  postProducts,
  updateProduct,
  deleteProduct
} from './actions/productsActions'

const store = createStore(reducers)

store.subscribe(() => {
  console.log('Current state is: ', store.getState())
})

store.dispatch(postProducts(
  [{
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
  },
  {
    id: 3,
    name: 'Soap3',
    image: 'Image3',
    price: 12,
    description: 'Soap3',
    ingredients: ['Soap3'],
    inventory: 1
  }]
))

store.dispatch(deleteProduct({ id: 1 }))

store.dispatch(updateProduct({
  id: 2,
  name: 'Soap2'
}))

// CART ACTIONS:
store.dispatch(addToCart([{id: 1}]))
