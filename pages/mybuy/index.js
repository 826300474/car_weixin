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
  onReachBottom: function () {
    this.commonList.getData("more")
  },
  onPullDownRefresh: function () {
    this.commonList.getData("shuaxin")
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
  navClick: function (index) {
    // let num = index.detail;
    // let list = this.data.navList.map((item, index) => {
    //   return { ...item,
    //     state: index == num ? true : false
    //   }
    // })
    // this.setData({
    //   navList: list
    // }, this.getData())
  }
})