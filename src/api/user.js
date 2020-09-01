import axios from './index'

export function login (data) {
  console.log(data)
  return axios.post('/api/api-token-auth/', data)
}

export function getInfo (token) {
  console.log('getinfo')
  return axios.get('/api/users/user_info/')
  // return axios.post('/api/getInfo/',data)
}

export function logout () {
  return Promise.resolve()
}
