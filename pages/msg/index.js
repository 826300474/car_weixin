// pages/success/index.js
Page({
  data: { data : ""},
  onLoad: function (options) {
    let data = JSON.parse(options.data);
    this.setData({
      data:data
    })
  },
  buttonTap:function(e){
    wx.reLaunch({
      url: this.data.data.handle[e.target.id]['tap']
    })
  }
})