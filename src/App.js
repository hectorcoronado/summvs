import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'

// REDUCERS:
import reducers from './reducers/index'

// COMPONENTS:
import Footer from './components/Footer'
import Menu from './components/Menu'
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
    <div>
      <Menu />
      <ProductsList />
      <Footer />
    </div>
  </Provider>,
  document.getElementById('app')
)
