import request from '@/utils/request'

export function getAdList(params) {
  return request({
    url: '/adment/getAdList',
    method: 'post',
    params
  })
}

export function addAdment(params) {
  return request({
    url: '/adment/addAdment',
    method: 'post',
    data: params
  })
}

export function editAdment(params) {
  return request({
    url: '/adment/editAdment',
    method: 'post',
    data: params
  })
}

export function deleteAdment(params) {
  return request({
    url: '/adment/deleteAdment',
    method: 'post',
    params
  })
}
