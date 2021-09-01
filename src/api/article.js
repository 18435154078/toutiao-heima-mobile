/**
 * 文章有关的api
 */

import request from '@/utils/request'


// 频道新闻列表
export const getRecomList = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}


// 获取指定新闻
export const getArticleDetail = article_id => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${article_id}`
  })
}


// 收藏文章
export const addCollect = article_id => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/collections',
    data: {
      target: article_id
    }
  })
}


// 取消收藏文章
export const addLiking = article_id => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data: {
      target: article_id
    }
  })
}


// 点赞
export const deleteLiking = article_id => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${article_id}`
  })
}


// 取消点赞