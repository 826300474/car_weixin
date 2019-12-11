import {
  fenxiao
} from '../../api/index.js'
const createRecycleContext = require('../../weui-miniprogram/miniprogram_npm/miniprogram-recycle-view/index.js')
let ctx;
Page({
  data: {
    img: "",
    page: 1,
    pageSize: 10,
    list: [],
    data: "",
    emptyState: false
  },
  onReady: function () {
    ctx = createRecycleContext({
      id: 'recycleId',
      dataKey: 'recycleList',
      page: this,
      itemSize: this.itemSizeFunc
    })
    // ctx.append(newList)
    // ctx.update(beginIndex, list)
    // ctx.destroy()
  },
  onReachBottom: function () {
    console.log(555)
  },
  itemSizeFunc: function (item, idx) {
    return {
      width: ctx.transformRpx(750),
      height: ctx.transformRpx(140)
    }
  },
  onLoad: function (options) {
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
  getData: function () {
    if (!this.data.emptyState) {
      fenxiao({ page: this.data.page, pageSize: this.data.pageSize }).then(data => {
        if (data.list.records.length) {
          this.setData({
            page: this.data.page + 1,
            data: data
          })
          ctx.append(data.list.records)
        } else {
          this.setData({
            emptyState: true
          })
        }
      })
    }
  },
  save: function () {
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