/**
 * 
 * 处理用户相关的请求
 */

import request from '@/utils/request'

// 用户登录/注册
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

// 获取验证码
export const getCode = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}

// 获取用户自己信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}

// 关注用户
export const addFollow = userId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}

// 取消关注用户
export const deleteFollow = userId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${userId}`
  })
}

// 获取用户自己资料
export const getUser = () => {
  return request({
    url: '/app/v1_0/user/profile',
    method: 'GET'
  })
}

// 修改用户信息
export const undateUser = data => {
  return request({
    url: '/app/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}

// 修改用户头像
export const undateUserAvatar = data => {
  return request({
    url: '/app/v1_0/user/photo',
    method: 'PATCH',
    data
  })
}
