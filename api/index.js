import request from '../utils/request.js'
export function getList(params) {
  return request({
    url: '/wx/article',
    method: 'GET',
    params
  })
}

export function getXq(params) {
  return request({
    url: `/wx/article/${params.id}`,
    method: 'GET'
  })
}