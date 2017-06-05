import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
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
  <Provider store={store}>
    <ProductsList />
  </Provider>,
  document.getElementById('app')
)

store.dispatch(postProducts(
  [{
    id: 1,
    name: 'Soap',
    image: 'Image',
    price: 10,
    description: 'Simple Soap',
    ingredients: ['Soap'],
    inventory: 1
  },
  {
    id: 2,
    name: 'SoapTwo',
    image: 'ImageTwo',
    price: 15,
    description: 'Complex Soap',
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
