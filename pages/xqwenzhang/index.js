import {
  getXq,
  like,
  unlike,
  createOrders,
} from '../../api/index.js'
Page({
  data: {
    myId: "",
    content: "",
    recommend: [],
    is_buy:0,
    like: null
  },
  onLoad: function (options) {
    if (options.id) {
      this.setData({
        myId: options.id
      })
      this.getData()
    }
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
        recommend: data.recommend,
      })
    })
  },
  fenxiang: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  golike: function () {
    if (this.data.like) {
      unlike(this.data.myId).then(data => {
        this.setData({
          like: null,
        })
      })
    } else {
      like({
        articleId: this.data.myId
      }).then(data => {
        this.setData({
          like: true,
        })
      })
    }
  },
  buy: function () {
    var that = this;
    if (this.data.is_buy === 0) {
      createOrders({
        articleId: this.data.myId
      }).then(data => {
        wx.requestPayment({
          timeStamp: data.timeStamp,
          nonceStr: data.nonceStr,
          package: data.package,
          signType: 'MD5',
          paySign: data.paySign,
          success(res) {
            that.getData()
          },
          fail(res) {
            wx.showToast({
              title: '支付失败',
              icon: 'none'
            })
          }
        })
      })
    }

  }
})