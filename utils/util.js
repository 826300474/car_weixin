import {
  login
} from '../api/index.js'

export function openLogin(invitedBy = "") {
  return new Promise(function (a, b) {
    wx.login({
      success: res => {
        wx.setStorage({
          key: 'login_code',
          data: res.code,
        })
        login({
          "code": res.code,
          "invitedBy": invitedBy
        }).then(data => {
          try {
            wx.setStorage({
              key: "openId",
              data: data
            })
            a()
          } catch (e) {

          }
        })
      }
    })
  })

}


export function chunk(item, size) {
  if (item.length <= 0 || size <= 0) {
    return item;
  }

  let chunks = [];

  for (let i = 0; i < item.length; i = i + size) {
    chunks.push(item.slice(i, i + size));
  }

  return chunks
}