Page({
  data: {
    gerenData:""
  },
  onLoad: function(options) {
    // this.getInfo()
    // try {
    //   var openId = wx.getStorageSync('openId') || ""
    //   if (openId) {
    //     this.getInfo()
    //   }
    // } catch(e) {

    // }
  },
  onGotUserInfo: function (e) {
    console.log(e.detail.userInfo)
    this.setData({
      gerenData: e.detail.userInfo
    })
  },
  goto: function(e) {
    wx.navigateTo({
      url: '/pages/mybuy/index?type=' + e.target.id,
    })
  },
  ziliao: function() {
    wx.navigateTo({
      url: '/pages/ziliao/index'
    })
  },
  fenxiao: function() {
    wx.navigateTo({
      url: '/pages/fenxiao/index'
    })
  },
  getInfo: function() {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        // console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // console.log(res)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  }
})