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

export function profile(params) {
  return request({
    url: `/wx/member/profile`,
    method: 'GET',
  })
}

export function getBanner() {
  return request({
    url: `/wx/banner`,
    method: 'GET',
  })
}

export function getBehavior() {
  return request({
    url: `/wx/behavior`,
    method: 'GET',
  })
}

export function like(params) {
  return request({
    url: `/wx/article/like`,
    method: 'POST',
    params
  })
}

export function unlike(id) {
  return request({
    url: `/wx/article/like/${id}`,
    method: 'DELETE',
  })
}

export function createOrders(params) {
  return request({
    url: `/wx/orders/create`,
    method: 'POST',
    params
  })
}
