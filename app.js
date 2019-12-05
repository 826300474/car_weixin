//app.js
import { openLogin } from "utils/util.js"
App({
  onLaunch: function(e) {
    console.log(e)
    //登录
    try {
      var value = wx.getStorageSync('openId')
      if (!value) {
        openLogin(e.query.invitedBy)
      }
    } catch (e) {

    }
  },
  globalData: {
    userInfo: null
  }
})