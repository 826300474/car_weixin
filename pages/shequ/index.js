import {
  getCategories
} from '../../api/index.js'
Page({
  data: {
    activeTab: 2,
    navList: [{
      'categoryName': '全部',
      'id': -1,
    }],
    activeNav: -1,
    listParam: {
      type: 2
    },
    isCheck:0
  },
  onLoad: function (options) {
    let that = this;
    wx.getStorage({
      key: 'config',
      success: function(res) {
        // res.data.isCheck = 1;
        that.setData({
          isCheck: res.data.isCheck 
        })
        if (res.data.isCheck === 1 ){
            that.setData({
              listParam: {
                type: 1
              },
              activeTab:1
            })
        }
        that.getCategories();
      },
    })
    
  },
  onReady: function () {
    this.commonList = this.selectComponent("#commonList")
  },
  getCategories: function () {
    let sendData = {};
    if (this.data.activeTab !== 0) {
      sendData = {
        categoryId: this.data.activeTab
      }
    }
    getCategories(sendData).then(data => {
      this.setData({
        navList: [this.data.navList[0], ...data]
      })
    })
  },
  navClick: function (index) {
    let type = this.data.navList[index.detail]['id']
    if (type > 0) {
      this.setData({
        activeNav: type,
        listParam: {
          ...this.data.listParam,
          categoryId: type
        }
      })
    } else {
      this.setData({
        activeNav: type,
        listParam: {
          ...this.data.listParam,
          categoryId: "",
        }
      })
    }
    this.commonList.getData("shuaxin")
  },
  changNav: function (e) {
    let id = Number(e.target.id)
    if (id === 0) {
      this.setData({
        activeNav: -1,
        activeTab: id,
        listParam: "",
      })
    } else {
      this.setData({
        activeNav: -1,
        activeTab: id,
        listParam: {
          type: id
        },
      })
    }
    this.getCategories();
    this.commonList.getData("shuaxin")
  }
})