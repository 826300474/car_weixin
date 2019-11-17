//app.js
import { openLogin } from "utils/util.js"
App({
  onLaunch: function() {
    //登录
    try {
      var value = wx.getStorageSync('openId')
      if (!value) {
        openLogin()
      }
    } catch (e) {

    }
  },
  globalData: {
    userInfo: null
  }
})