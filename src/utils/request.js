import axios from 'axios'
import store from '@/store'
// import { getStorage } from '@/utils/storage'
// getStorage('toutiao-token').token

const request = axios.create({
  // baseURL: 'http://api-toutiao-web.itheima.net/',
  baseURL: 'http://ttapi.research.itcast.cn',
  headers: {
    // 'Content-Type': 'application/json'
  }
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const user = store.state.token
  if(user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})


export default request
