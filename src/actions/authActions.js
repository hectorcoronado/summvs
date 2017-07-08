import axios from 'axios'

export function signinUser ({ email, password }) {
  return (dispatch) => {
    axios.post('/api/signin', { email, password })
  }
}
  // submit email/pw to server
  // req ok?
  // - update state to auth user
  // - save jwt token
  // - redirect to /somewhere

  // req bad?
  // - show error to user
