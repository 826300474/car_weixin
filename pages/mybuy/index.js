import {
  likeList,
  orderList
} from '../../api/index.js'
Page({
  data: {
    listParam: {},
    api: { data: "" },
    activeIndex: 0,
    list: [],
    pageNow: 0,
    pageSize: 5
  },
  onLoad: function (options) {
    if (options.type === 'love') {
      wx.setNavigationBarTitle({
        title: '我的收藏'
      })
      this.setData({ api: { data: likeList }, name: 'like'})
    } else {
      wx.setNavigationBarTitle({
        title: '我的购买'
      })
      this.setData({ api: { data: orderList }, name: 'order'})
    }
  },
  onReady: function () {
    this.commonList = this.selectComponent("#commonList")
  },
  changNav: function (e) {
    if (e.target.id === "0") {
      this.setData({
        activeIndex: Number(e.target.id),
        listParam: {},
      })
    } else {
      this.setData({
        activeIndex: Number(e.target.id),
        listParam: {
          type: e.target.id
        },
      })
    }
    this.commonList.getData("shuaxin")
  },
})