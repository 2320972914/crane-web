import request from '@/utils/request'

export function getUserList(params) {
  return request({
    url: '/user/getUserList',
    method: 'post',
    params
  })
}
