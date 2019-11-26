import {
  getCategories
} from '../../api/index.js'
Page({
  data: {
    navList: [{
      'categoryName': '全部',
      'id': -1,
    }],
    activeNav: -1,
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
    let type = this.data.navList[index.detail]['id']
    if (type > 0 ){
      this.setData({
        activeNav: type,
        listParam: {
          ...this.data.listParam,
          category: type
        }
      })
    }else{
      this.setData({
        activeNav: type,
        listParam: {
          type: 2
        }
      })
    }
    this.commonList.getData("shuaxin")
  }
})