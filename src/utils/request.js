import axios from 'axios'
import store from '@/store'
import jsonBignit from 'json-bigint'
import router from '@/router'

const request = axios.create({
  // baseURL: 'http://api-toutiao-web.itheima.net/',
  baseURL: 'http://ttapi.research.itcast.cn',
  transformResponse: [
    function(data) {
      try {
        return jsonBignit.parse(data)
      } catch {
        return data
      }
    }
  ]
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


// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  if(error && error.response && error.response.status === 401) {
    const user = store.state.token
    if(!user || !user.token) {
      router.push('/login')
      return
    }
    if (user.refresh_token) {
      try {
        axios({
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${user.refresh_token}`
          }
        }).then(res => {
          user.token = res.data.data.token
          store.commit('SET_TOKEN', user)

          console.log(error.config)
          // 最后重新再发一次请求
          // return request(error.config)
        })
      } catch(err) {
        console.log(err)
        router.push('/login')
      }
    }
  }
  return Promise.reject(error);
});


export default request
