import axios from 'axios'

const localStorage = window.localStorage

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

// trivial ex to use backend auth:
export function getOrders () {
  return (dispatch) => {
    axios.get('/api/orders', {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        console.log(response)
      })
  }
}
