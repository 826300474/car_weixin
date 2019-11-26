import {
  fenxiao
} from '../../api/index.js'
Page({
  data: {
    img: "",
    page:1,
    pageSize:10,
    list:[]
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
    this.getData();
  },
  getData:function(){
    fenxiao({ page: this.data.page, pageSize: this.data.pageSize } ).then(data=>{
      this.setData({
        list: data.list.records
      })
    })
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