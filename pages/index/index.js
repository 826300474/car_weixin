const app = getApp()
import {
  getList
} from '../../api/index.js'
Page({
  data: {
    list: [],
    banner: ["https://pic.qqtn.com/up/2019-11/2019110408121188043.jpg", "https://pic.qqtn.com/up/2019-11/2019110408121188043.jpg", "https://pic.qqtn.com/up/2019-11/2019110408121188043.jpg"],
    pageNow: 1,
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
      type:'1',
      pageNum: this.data.pageNow,
      pageSize: this.data.pageSize,
    }
    getList(data).then(data => {
      // console.log(data);
      wx.stopPullDownRefresh()
      this.setData({
        list: [...data.content, ...this.data.list]
      })
    })
  },
})