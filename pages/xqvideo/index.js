import {
  getXq,
  like,
  unlike,
  createOrders,
  profile,
  nickAvatar
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
    useInfo: '',
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
  },
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  upDataFromSon: function (data) {
    this.setData(data.detail);
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
  onGotUserInfo: function (e) {
    this.setData({
      useInfo: e.detail.userInfo
    })
    wx.setStorage({
      key: 'useInfo',
      data: e.detail.userInfo,
    })
    nickAvatar({
      "avatarUrl": e.detail.userInfo.avatarUrl,
      "nickname": e.detail.userInfo.nickName
    }).then(data => {
      this.buy()
    })
  },
  getData: function (tag) {
    wx.showLoading({
      title: '加载中...',
    })
    getXq({ id: this.data.myId }).then(data => {
      wx.hideLoading()
      var newStr = data.article.content.replace(/<img/g, '<img style="width:100%" ');
      data.article.content = newStr;
      if (tag) {
        this.videoContext.play()
        this.setData({
          content: data.article,
          like: data.like,
          is_buy: data.is_buy,
          member: data.member,
          playState: true
        })

      } else {
        this.setData({
          videoUrl: data.article.videoUrl,
          content: data.article,
          like: data.like,
          is_buy: data.is_buy,
          member: data.member,
          recommend: data.recommend,
        })
      }
    })
  },
  fenxiang: function () {
    
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
    profile().then(data => {
      let customerState = Number(data.customerState);
      if (customerState === 0) {
        wx.showModal({
          content: '请先提交个人资料',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/ziliao/index',
              })
            }
          }
        })
      } else if (customerState === 1) {
        wx.showToast({
          title: '资料审核中，请耐心等待',
        })
      } else if (customerState === 2) {
        this.buy_next()
      } else if (customerState === -1) {
        wx.showToast({
          title: '资料审核失败，无法购买',
        })
      }
    })
  },
  buy_next: function () {
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