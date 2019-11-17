import {
  login
} from '../api/index.js'
export function openLogin() {
  wx.login({
    success: res => {
      login({
        "code": res.code,
        "invitedBy": ""
      }).then(data => {
        try {
          wx.setStorage({
            key: "openId",
            data: data
          })
        } catch (e) {

        }
      })
    }
  })
}