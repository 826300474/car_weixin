import request from '../utils/request.js'

export function getList(params) {
  return request({
    url: '/irs/rcd',
    method: 'POST',
    params
  })
}