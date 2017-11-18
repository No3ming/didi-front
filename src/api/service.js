/**
 * Created by ldm on 2017/11/1.
 */
/**
 * wrap fetch function
 */
import axios from 'axios'
import store from '../store'
import getCookie from '../utils/getCookie'
import setCookie from '../utils/setCookie'

let token = store.getters.token || getCookie('user-token') || ''
// 设置请求公共参数
axios.defaults.timeout = 10000
axios.defaults.baseURL = '/api'
axios.defaults.params = {token: token}
axios.defaults.headers.post['Content-Type'] = 'application/json'

function parseResponse (response) {
  return Promise.all([response.status, response.statusText, response.data])
}

function checkStatus ([status, statusText, data]) {
  if (status >= 200 && status < 300) {
    return data
  } else {
    let error = new Error(statusText)
    error.status = status
    error.error_message = data
    if (status === 402 || status === 405) {
      store.dispatch('upIsLogin', false)
      setCookie('token', '', -1)
    }
    return Promise.reject(error)
  }
}

function handleError (error) {
  console.log(error)
  store.dispatch('hideLoading')
  store.dispatch('toast', '网络正在开小差，请稍后再试')
}

export default {
  get (url, param = {}) {
    let query = []
    Object.keys(param).forEach(item => {
      query.push(`${item}=${encodeURIComponent(param[item])}`)
    })
    let params = query.length ? '?' + query.join('&') : ''
    return axios.get(url + params).then(parseResponse).then(checkStatus).catch(error => handleError(error))
  },
  post (url, params = {}) {
    return axios.post(url, params).then(parseResponse).then(checkStatus).catch(error => handleError(error))
  }
}
