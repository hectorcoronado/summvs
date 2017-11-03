import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import authReducers from './authReducers'
import cartReducers from './cartReducers'
import ordersReducers from './ordersReducers'
import productsReducers from './productsReducers'

export default combineReducers({
  form,
  auth: authReducers,
  cart: cartReducers,
  orders: ordersReducers,
  products: productsReducers
})
