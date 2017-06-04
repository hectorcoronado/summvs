import { combineReducers } from 'redux'

import cartReducers from './cartReducers'
import productsReducers from './productsReducers'

export default combineReducers({
  cart: cartReducers,
  products: productsReducers
})
