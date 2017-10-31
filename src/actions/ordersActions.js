import axios from 'axios'

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
