import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import cartReducers from './cartReducers'
import productsReducers from './productsReducers'

export default combineReducers({
  form,
  cart: cartReducers,
  products: productsReducers
})
