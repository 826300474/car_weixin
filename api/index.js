import request from '../utils/request.js'
export function getList(params) {
  return request({
    url: '/wx/article',
    method: 'GET',
    params
  })
}

export function config(params) {
  return request({
    url: '/wx/config',
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

export function sign(params) {
  return request({
    url: `/wx/behavior/sign`,
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

export function likeList(params) {
  return request({
    url: `/wx/like`,
    params
  })
}

export function orderList(params) {
  return request({
    url: `/wx/orders`,
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


export function attachment(params) {
  return request({
    url: `/app/attachment`,
    method: 'POST',
    params
  })
}

export function reg(params) {
  return request({
    url: `/wx/member/reg`,
    method: 'PUT',
    params
  })
}

export function setMobile(params) {
  return request({
    url: `/wx/member/set-mobile`,
    method: 'PUT',
    params
  })
}


export function invitor(params) {
  return request({
    url: `/wx/member/invitor`,
    method: 'PUT',
    params
  })
}

export function nickAvatar(params) {
  return request({
    url: `/wx/member/nick-avatar`,
    method: 'PUT',
    params
  })
}

export function allbytype(params) {
  return request({
    url: `/wx/dictionary/all-by-type`,
    params
  })
}

export function fenxiao(params) {
  return request({
    url: `/wx/fenxiao`,
    params
  })
}

