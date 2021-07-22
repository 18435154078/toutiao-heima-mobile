import request from '@/utils/request'


// 获取文章列表
// export const getArticleList = (id, params) => {
//   return request({
//     method: 'GET',
//     url: `/app/v1_0/users/${id}/articles`,
//     params
//   })
// }

// 频道新闻列表
export const getRecomList = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
