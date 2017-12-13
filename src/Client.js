import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { browserHistory, IndexRoute, Redirect, Route, Router } from 'react-router'
import { applyMiddleware, createStore } from 'redux'
// import logger from 'redux-logger'
import thunk from 'redux-thunk'

// REDUCERS:
import reducers from './reducers'
// ACTIONS:
import { AUTH_USER } from './actions/types'

// COMPONENTS:
import About from './components/About'
import Account from './components/Account'
import Cart from './components/Cart'
import Main from './components/Main'
import ProductsForm from './components/ProductsForm'
import ProductsList from './components/ProductsList'
import NotFound from './components/NotFound'
// AUTH COMPONENTS:
import EmailVerify from './components/auth/EmailVerify'
import ForgotPassword from './components/auth/ForgotPassword'
import UnauthRedirect from './components/auth/UnauthRedirect'
import ResetPassword from './components/auth/ResetPassword'
import Signin from './components/auth/Signin'
import Signout from './components/auth/Signout'
import Signup from './components/auth/Signup'
// STRIPE COMPONENTS
import PurchaseComplete from './components/stripe/PurchaseComplete'
// HOC TO PROTECT ROUTES:
import RequireAdmin from './components/auth/RequireAdmin'
import RequireAuth from './components/auth/RequireAuth'

// CREATE REDUX STORE:
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

const store = createStoreWithMiddleware(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__()
)

let localStorage = window.localStorage

const token = localStorage.getItem('token')

if (token) {
  store.dispatch({ type: AUTH_USER })
}

// DEFINE ROUTES:
const ROUTES = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={Main}>
        <IndexRoute component={ProductsList} />
        <Route path='/about' component={About} />
        <Route path='/account' component={RequireAuth(Account)} />
        {/* <Route path='/admin' component={RequireAdmin(ProductsForm)} /> */}
        <Route path='/cart' component={Cart} />
        <Route path='/complete' component={PurchaseComplete} />
        <Route path='/forgot' component={ForgotPassword} />
        <Route path='/reset/:resetPasswordToken' component={ResetPassword} />
        <Route path='/signin' component={Signin} />
        <Route path='/signout' component={Signout} />
        <Route path='/signup' component={Signup} />
        <Route path='/signup/:validationString' component={EmailVerify} />
        <Route path='/unauthredirect' component={UnauthRedirect} />
        <Route path='/404' component={NotFound} />
        <Redirect from='*' to='/404' />
      </Route>
    </Router>
  </Provider>
)

ReactDOM.render(
  ROUTES,
  document.getElementById('app')
)
