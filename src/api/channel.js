/**
 * 频道有关的api
 */


import request from '@/utils/request'

// 获取用户频道列表
export const getUserChannel = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}

// 删除频道
export const deleteUserChannel = channel_id => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channel_id}`
  })
}

// 添加频道
export const AddUserChannel = data => {
  return request({
    method: 'PUT',
    url: '/app/v1_0/user/channels',
    data
  })
}

// 获取所有频道
export const getAllChannel = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}
