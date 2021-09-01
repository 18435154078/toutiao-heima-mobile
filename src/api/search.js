/**
 * 
 * 处理搜索相关的请求
 */

 import request from '@/utils/request'

 // 联想建议
 export const getSearchSuggestion = q => {
   return request({
      method: 'GET',
      url: '/app/v1_0/suggestion',
      params: {
        q
      }
   })
 }


// 搜索结果
export const getSearchResult = params => {
  return request({
     method: 'GET',
     url: '/app/v1_0/search',
     params
  })
}


// 获取历史搜索记录
export const getSearchHistory = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search/histories'
  })
}


// 删除历史记录
export const deleteSearchHistory = () => {
  return request({
    method: 'DELETE',
    url: '/app/v1_0/search/histories'
  })
}
