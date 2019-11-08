// pages/ziliao/index.js
Page({
  data: {

  },
  onLoad: function (options) {

  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  formSubmit: function (e) {
    let data = {
      title: '1',
      msg: '2'
    }
    wx.navigateTo({
      url: './../success/index?data=' + JSON.stringify(data),
    })
  }
})