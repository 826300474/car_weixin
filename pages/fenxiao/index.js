// pages/fenxiao/index.js
Page({
  data: {
    img: ""
  },
  onLoad: function(options) {
    try {
      var value = wx.getStorageSync('openId')
      if (value) {
        this.setData({
          img: 'https://sh-car.oss-cn-hangzhou.aliyuncs.com/' + value + '.jpg.jpg'
        })
      }
    } catch (e) {

    }
  },
  save: function() {
    wx.downloadFile({
      url: this.data.img,
      success(res) {
        if (res.statusCode === 200) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success() {
              wx.showToast({
                title: '保存成功',
                icon: 'none'
              })
            }
          })
        }
      }
    })
  }
})