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

export function getCategories(params) {
  return request({
    url: `/wx/article/categories`,
    method: 'GET',
    params
  })
}

export function login(params) {
  return request({
    url: `/wx/member/login`,
    method: 'POST',
    params
  })
}