Page({
  data: {
  },
  onLoad: function (options) {

  },
  goto: function (e) {
    wx.navigateTo({
      url: '/pages/mybuy/index?type=' + e.target.id,
    })
  },
  ziliao:function(){
    wx.navigateTo({
      url: '/pages/ziliao/index'
    })
  },
  fenxiao: function () {
    wx.navigateTo({
      url: '/pages/fenxiao/index'
    })
  }
})