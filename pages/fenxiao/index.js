import {
  fenxiao
} from '../../api/index.js'
Page({
  data: {
    img: "",
    page:1,
    pageSize:10,
    list:[],
    data:""
  },
  onLoad: function(options) {
    try {
      var value = wx.getStorageSync('openId')
      if (value) {
        this.setData({
          img: 'https://sh-car.oss-cn-hangzhou.aliyuncs.com/' + value + '.jpg'
        })
      }
    } catch (e) {

    }
    this.getData();
  },
  getData:function(){
    fenxiao({ page: this.data.page, pageSize: this.data.pageSize } ).then(data=>{
      // console.log(data.list.records)
      this.setData({
        data:data,
        list: this.data.list.concat(data.list.records)
      })
    })
  },
  onReachBottom: function () {
    this.setData({
      page: this.data.page + 1
    })
    this.getData();
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