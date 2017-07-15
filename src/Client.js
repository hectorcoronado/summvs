import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { browserHistory, IndexRoute, Route, Router } from 'react-router'
import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

// REDUCERS:
import reducers from './reducers/index'

// COMPONENTS:
import About from './components/About'
import Cart from './components/Cart'
import Main from './components/Main'
import ProductsForm from './components/ProductsForm'
import ProductsList from './components/ProductsList'
import Signin from './components/auth/Signin'
import Signout from './components/auth/Signout'

// CREATE REDUX STORE:
const createStoreWithMiddleware = applyMiddleware(logger, thunk)(createStore)

const store = createStoreWithMiddleware(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__()
)

// DEFINE ROUTES:
const ROUTES = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={Main}>
        <IndexRoute component={ProductsList} />
        <Route path='/about' component={About} />
        <Route path='/admin' component={ProductsForm} />
        <Route path='/cart' component={Cart} />
        <Route path='/signin' component={Signin} />
        <Route path='/signout' component={Signout} />
      </Route>
    </Router>
  </Provider>
)

ReactDOM.render(
  ROUTES,
  document.getElementById('app')
)
