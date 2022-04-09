import request from '@/utils/request'

export function getStandardList(params) {
  return request({
    url: '/craneStandard/getStandardList',
    method: 'post',
    params
  })
}

export function addStandard(params) {
  return request({
    url: '/craneStandard/addStandard',
    method: 'post',
    data: params
  })
}

export function editStandard(params) {
  return request({
    url: '/craneStandard/editStandard',
    method: 'post',
    data: params
  })
}

export function deleteStandard(params) {
  return request({
    url: '/craneStandard/deleteStandard',
    method: 'post',
    params
  })
}

export function getCraneInfoList(params) {
  return request({
    url: '/craneInfo/getCraneInfoList',
    method: 'post',
    params
  })
}

export function addCrane(params) {
  return request({
    url: '/craneInfo/addCrane',
    method: 'post',
    data: params
  })
}

export function deleteCrane(params) {
  return request({
    url: '/craneInfo/deleteCrane',
    method: 'post',
    params
  })
}
