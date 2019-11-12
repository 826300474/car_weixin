// pages/fenxiao/index.js
Page({
  data: {
    img:'https://pic.qqtn.com/up/2019-11/2019110408121188043.jpg'
  },
  onLoad: function (options) {

  },
  save:function(){
    // wx.saveImageToPhotosAlbum({
    //   filePath: '',
    //   success(){
        
    //   }
    // })
    wx.showToast({
      title: '保存成功',
      icon:'none'
    })
  }
})