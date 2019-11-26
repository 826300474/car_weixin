import {
  getXq,
  like,
  unlike,
  createOrders
} from '../../api/index.js'
Page({
  data: {
    playState: true,
    list: [],
    myId: "",
    like: null,
    recommend: [],
    listParam: {
      type: 1
    },
  },
  onLoad: function (options) {
    if (options.id) {
      this.setData({
        myId: options.id
      })
      this.getData()
    }
    // this.getData()
  },
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  timeupdate: function (e) {
    if (this.data.content.isSale !== 1 && this.data.content.isCharge === 1) {
      if (e.detail.currentTime > this.data.content.isSale ) {
        this.videoContext.pause()
        this.setData({
          playState: false
        })
      }
    }
  },
  getData: function () {
    getXq({ id: this.data.myId }).then(data => {
      var newStr = data.article.content.replace(/<img/g, '<img style="width:100%" ');
      data.article.content = newStr;
      this.setData({
        content: data.article,
        like: data.like,
        recommend: data.recommend,
      })
    })
  },
  golike: function () {
    if (this.data.like) {
      unlike(this.data.myId).then(data => this.getData())
    } else {
      like({
        articleId: this.data.myId
      }).then(data => this.getData())
    }
  },
  buy: function () {
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