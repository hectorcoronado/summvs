// import {
//   FETCH_POST,
//   FETCH_POSTS
// } from '../actions/types';
import {
  POST_SOAP,
  DELETE_SOAP
} from '../actions/types'

const INITIAL_STATE = {
  soaps: []
}

const reducer = function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case POST_SOAP:
      return {
        soaps: [...state.soaps, ...action.payload]
      }
      break
    case DELETE_SOAP:
      // create copy of current arr of soaps:
      const currentSoapToDelete = [...state.soaps]
      // determine index of soap in arr to be deleted:
      const indexToDelete = currentSoapToDelete.findIndex(
        (soap) => { return soap.id === action.payload.id }
      )
      // slice soap at specific index:
      return { soaps: [...currentSoapToDelete.slice(0, indexToDelete), ...currentSoapToDelete.slice(indexToDelete + 1)] }
      break
    default:
      return state
  }
}
