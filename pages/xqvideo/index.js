import {
  getXq,
  like,
  unlike,
  createOrders
} from '../../api/index.js'
Page({
  data: {
    videoUrl: "",
    playState: true,
    list: [],
    myId: "",
    is_buy: 0,
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
  },
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  timeupdate: function (e) {
    if (this.data.content.isCharge === 1 && this.data.is_buy === 0) {
      if (e.detail.currentTime > this.data.content.minuteFree * 60) {
        this.videoContext.pause()
        this.videoContext.exitFullScreen()
        this.setData({
          playState: false
        })
      }
    }
  },
  getData: function (tag) {
    // let that = this;
    wx.showLoading({
      title: '加载中...',
    })
    getXq({ id: this.data.myId }).then(data => {
      wx.hideLoading()
      var newStr = data.article.content.replace(/<img/g, '<img style="width:100%" ');
      data.article.content = newStr;
      if (tag) {
        this.setData({
          content: data.article,
          like: data.like,
          is_buy: data.is_buy,
          playState:true
        })
        this.videoContext.play()
      } else {
        this.setData({
          videoUrl: data.article.videoUrl,
          content: data.article,
          like: data.like,
          is_buy: data.is_buy,
          recommend: data.recommend,
        })
      }
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
            that.getData('pay')
            // that.setData({
            //   playState: true
            // })
            // that.videoContext.play()
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