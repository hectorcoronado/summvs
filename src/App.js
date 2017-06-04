import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'

// REDUCERS:
import reducers from './reducers/index'

// ACTIONS:
import { addToCart } from './actions/cartActions'
import {
  postProducts,
  updateProduct,
  deleteProduct
} from './actions/productsActions'

// COMPONENTS:
import ProductsList from './components/ProductsList'

// CREATE REDUX STORE:
const createStoreWithMiddleware = applyMiddleware(logger)(createStore)

const store = createStoreWithMiddleware(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <ProductsList />,
  document.getElementById('app')
)

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
