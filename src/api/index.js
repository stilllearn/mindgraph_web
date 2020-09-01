import axios from 'axios' // 引入axios
import store from '@/store'
import { getToken } from '@/utils/auth'
import { createHashHistory } from 'history'
let instance = axios.create()
// http request 拦截器
// var token = "Token 0fde0a1cb7fe1107b3a1c2a1b944f5469c525238"
const history = createHashHistory()

instance.interceptors.request.use(
  config => {
    console.log(config.method)
    console.log(store.getters.token)
    config.withCredentials = true
    if (store.getters.token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers['authorization'] = 'Token ' + getToken() // 请求头加上token
    }
    console.log('interceptors')
    return config
  },
  err => {
    return Promise.reject(err)
  })

instance.interceptors.response.use(response => {
  return response
}, err => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400: err.message = '请求错误(400)'; break
      // eslint-disable-next-line no-unreachable
      case 401: return history.push('/login'); break
      case 403: err.message = '拒绝访问(403)'; break
      case 404: err.message = '请求出错(404)'; break
      case 408: err.message = '请求超时(408)'; break
      case 500: err.message = '服务器错误(500)'; break
      case 501: err.message = '服务未实现(501)'; break
      case 502: err.message = '网络错误(502)'; break
      case 503: err.message = '服务不可用(503)'; break
      case 504: err.message = '网络超时(504)'; break
      case 505: err.message = 'HTTP版本不受支持(505)'; break
      default: err.message = `连接出错(${err.response.status})!`
    }
  } else {
    err.message = '连接服务器失败!'
  }
  this.$message.error(err.message)
  return Promise.reject(err)
})
export default instance
