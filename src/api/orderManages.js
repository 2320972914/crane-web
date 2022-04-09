import request from '@/utils/request'

export function getOrderList(params) {
  return request({
    url: '/craneOrder/getOrderList',
    method: 'post',
    params
  })
}

export function operation(params) {
  return request({
    url: '/craneOrder/operation',
    method: 'post',
    params
  })
}

export function backDeleteOrder(params) {
  return request({
    url: '/craneOrder/backDeleteOrder',
    method: 'post',
    params
  })
}
