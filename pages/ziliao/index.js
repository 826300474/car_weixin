import {
  profile
} from '../../api/index.js'
Page({
  data: {
    files: [],
    array: ['美国', '中国', '巴西', '日本'],
    index: "",
    loading:false
  },
  onLoad() {
    this.getData()
    this.setData({
      selectFile: this.selectFile.bind(this),
      uplaodFile: this.uplaodFile.bind(this)
    })
  },
  // chooseImage: function(e) {
  //   console.log(5)
  //   var that = this;
  //   wx.chooseImage({
  //     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
  //     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
  //     success: function(res) {
  //       // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
  //       that.setData({
  //         files: that.data.files.concat(res.tempFilePaths)
  //       });
  //     }
  //   })
  // },
  previewImage: function(e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  selectFile(files) {
    
  },
  uplaodFile(files) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {  
        let urls = "https://pic.qqtn.com/up/2019-11/2019110408121188043.jpg"
        resolve({ urls })
      }, 1000)
    })
  },
  uploadError(e) {
    
  },
  uploadSuccess(e) {
    
  },
  getData: function() {
    profile().then(data => {

    })
  },
  bindRegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  bindPickerChange:function(e){
    this.setData({
      index: e.detail.value
    })
  },
  formSubmit: function(e) {
    console.log(e.detail.value)
    // let data = {
    //   title: '1',
    //   msg: '2'
    // }
    // wx.navigateTo({
    //   url: './../success/index?data=' + JSON.stringify(data),
    // })
  }
})