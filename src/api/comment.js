/**
 * 有关评论的请求
 */

 import request from '@/utils/request'

 // 添加评论
export const addComment = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data
  })
}


// 获取文章评论
export const getComment = (params, data) => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params,
    data
  })
}


// 新闻评论点赞
export const addCommentLike = comment_id => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comment/likings',
    data: {
      target: comment_id
    }
  })
}


// 取消评论点赞
export const deleteCommentLike = comment_id => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/comment/likings/${comment_id}`
  })
}

