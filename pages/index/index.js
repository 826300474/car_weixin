const app = getApp()
import {
  getList
} from '../../api/index.js'
Page({
  data: {
    list: [],
    banner: ["https://pic.qqtn.com/up/2019-11/2019110408121188043.jpg", "https://pic.qqtn.com/up/2019-11/2019110408121188043.jpg", "https://pic.qqtn.com/up/2019-11/2019110408121188043.jpg"],
    pageNow: 0,
    pageSize: 5
  },
  onLoad: function() {
    this.getData();
  },
  onReachBottom: function() {
    this.setData({
      pageNow: this.data.pageNow + 1,
    }, this.getData())
  },
  onPullDownRefresh: function() {
    this.setData({
      pageNow: 0,
    }, this.getData())
  },
  getData: function() {
    let data = {
      cid: 56,
      ext: 'games',
      token: 'c786875b8e04da17b24ea5e332745e0f',
      num: this.data.pageSize,
      expIds: '20190106A13PFT % 7C20190108A04MLS',
      page: this.data.pageNow,
    }
    getList(data).then(data => {
      wx.stopPullDownRefresh()
      this.setData({
        list: [...data, ...this.data.list]
      })
    })
  },
})