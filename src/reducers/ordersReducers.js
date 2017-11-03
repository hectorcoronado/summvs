import {
  GET_ORDERS
} from '../actions/types'

const INITIAL_STATE = {
  orders: []
}

export default function cartReducers (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        orders: filterOrders(action.payload)
      }

    default:
      return state
  }
}

// add only orders with a user:
export function filterOrders (payloadArr) {
  /*
  for (var i = 0; i < payloadArr.length; i++) {
    if (payloadArr[i].user) {
      return (payloadArr[i].user)
    }
  }
  */
  return payloadArr.filter((el) => {
    return el.user
  })
}
