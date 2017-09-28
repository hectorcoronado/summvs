import axios from 'axios'

// import {
//   POST_ORDER
// } from './types'

export function postOrder (order) {
  console.log('order at postOrder:')
  console.log(order)
  return (dispatch) => {
    axios.post('/api/orders', order)
      .then((response) => {
        console.log('response:')
        console.log(response)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
