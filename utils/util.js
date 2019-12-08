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

export function transformRpx(val){
  return val / 750 * wx.getSystemInfoSync().windowWidth
}