import {
  getCategories
} from '../../api/index.js'
Page({
  data: {
    navList: [{
      'categoryName': '全部',
      'id': 0,
    }],
    activeNav: 0,
    listParam: {
      type: 2
    },
  },
  onLoad: function (options) {
    this.getCategories();
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
  getCategories: function () {
    getCategories({
      categoryId: '1'
    }).then(data => {
      this.setData({
        navList: [...this.data.navList, ...data]
      })
    })
  },
  navClick: function (index) {
    this.setData({
      activeNav: index.detail
    })
  }
})