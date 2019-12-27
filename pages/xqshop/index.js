import {
  getXq
} from '../../api/index.js'
Page({
  data: {
    myId: "",
    content: "",
    recommend: [],
    is_buy: 0,
    like: null,
    useInfo: ''
  },
  onLoad: function (options) {
    let useInfo = wx.getStorageSync("useInfo")
    this.setData({
      useInfo: useInfo,
    })
    if (options.id) {
      this.setData({
        myId: options.id
      })
      this.getData()
    }
    this.getData()
  },
  getData: function () {
    wx.showLoading({
      title: '加载中...',
    })
    getXq({
      id: this.data.myId
    }).then(data => {
      wx.hideLoading()
      var newStr = data.article.content.replace(/<img/g, '<img style="width:100%" ');
      data.article.content = newStr;
      this.setData({
        content: data.article,
        like: data.like,
        is_buy: data.is_buy,
        member: data.member,
        recommend: data.recommend,
      })
    })
  },
  upDataFromSon: function (data) {
    this.setData(data.detail);
  },
})