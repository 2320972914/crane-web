import request from '@/utils/request'

export function getUserList(params) {
  return request({
    url: '/user/getUserList',
    method: 'post',
    params
  })
}

export function addUser(params) {
  return request({
    url: '/user/addUser',
    method: 'post',
    data: params
  })
}

export function editUser(params) {
  return request({
    url: '/user/editUser',
    method: 'post',
    data: params
  })
}

export function resetPassword(params) {
  return request({
    url: '/user/resetPassword',
    method: 'post',
    params
  })
}

export function getAuthList(params) {
  return request({
    url: '/auth/getAuthList',
    method: 'post',
    params
  })
}

export function addAuth(params) {
  return request({
    url: '/auth/addAuth',
    method: 'post',
    data: params
  })
}
export function deleteAuth(params) {
  return request({
    url: '/auth/deleteAuth',
    method: 'post',
    params
  })
}

export function changeAuthStatus(params) {
  return request({
    url: '/auth/changeAuthStatus',
    method: 'post',
    params
  })
}

export function getRouterList(params) {
  return request({
    url: '/router/getRouterList',
    method: 'post',
    data: params
  })
}

export function addRouter(params) {
  return request({
    url: '/router/addRouter',
    method: 'post',
    data: params
  })
}

export function editRouter(params) {
  return request({
    url: '/router/editRouter',
    method: 'post',
    data: params
  })
}
