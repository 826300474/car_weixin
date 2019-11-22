import {
  getXq,
  like,
  unlike,
  createOrders,
} from '../../api/index.js'
Page({
  data: {
    myId: "1",
    content: "",
    recommend: [],
    like: null
  },
  onLoad: function(options) {
    if (options.id) {
      this.setData({
        myId: options.id
      })
      this.getData()
    }
    // this.getData()
  },
  getData: function() {
    getXq({
      id: this.data.myId
    }).then(data => {
      // console.log(data.recommend)
      this.setData({
        content: data.article,
        like: data.like,
        recommend: data.recommend,
      })
    })
  },
  golike: function() {
    if (this.data.like) {
      unlike(this.data.myId).then(data => this.getData())
    } else {
      like({
        articleId: this.data.myId
      }).then(data => this.getData())
    }
  },
  buy: function() {
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
          this.getData()
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
})