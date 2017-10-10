import axios from 'axios'

// import {
//   POST_ORDER
// } from './types'

export function postOrder (order) {
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
