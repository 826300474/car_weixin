import {
  like,
  unlike,
  nickAvatar,
  profile,
  createOrders
} from '../../api/index.js'
Component({
  properties: {
    myId: String,
    like: Boolean,
    content: Object,
    is_buy: Number,
    member: Object,
    type: {
      type: String,
      value: ''
    },
  },
  data: {
    pay_type: false,
    queren_type: false,
    groups: [],
    number: 1
  },
  methods: {
    toBuy: function () {
      this.setData({
        queren_type: false,
      })
      wx.navigateTo({
        url: '/pages/queren/index?id=' + this.data.myId + '&number=' + this.data.number
      })
    },
    setNumber: function (e) {
      if (e.target.id === "1") {
        if (this.data.number > 1) {
          this.setData({
            number: this.data.number - 1
          })
        }
      } else {
        this.setData({
          number: this.data.number + 1
        })
      }
    },
    golike: function () {
      if (this.data.like) {
        unlike(this.data.myId).then(data => {
          this.triggerEvent("upDataFromSon", {
            like: null,
          })
        })
      } else {
        like({
          articleId: this.data.myId
        }).then(data => {
          this.triggerEvent("upDataFromSon", {
            like: true,
          })
        })
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
          if (this.data.type === 'shop') {
            this.setData({
              queren_type: true
            })
          } else {
            if (this.data.member.account > 0) {
              this.setData({
                groups: [{
                  text: '微信支付',
                  value: 1
                },
                {
                  text: `储蓄支付（余额¥${this.data.member.account}）`,
                  value: 2
                },
                ],
                pay_type: true,
              })
            } else {
              this.buy_next({
                detail: {
                  value: 1
                }
              })
            }
          }
        } else if (customerState === -1) {
          wx.showToast({
            title: '资料审核失败，无法购买',
          })
        }
      })
    },
    buy_next: function (e) {
      this.setData({
        pay_type: false,
      })
      var that = this;
      if (this.data.is_buy === 0) {
        createOrders({
          articleId: this.data.myId,
          payType: e.detail.value
        }).then(data => {
          if (e.detail.value === 1) {
            wx.requestPayment({
              timeStamp: data.timeStamp,
              nonceStr: data.nonceStr,
              package: data.package,
              signType: 'MD5',
              paySign: data.paySign,
              success(res) {
                wx.showToast({
                  title: '支付成功',
                  icon: 'none'
                })
                this.triggerEvent("getData", "pay")
              },
              fail(res) {
                wx.showToast({
                  title: '支付失败',
                  icon: 'none'
                })
              }
            })
          } else {
            wx.showToast({
              title: '支付成功',
              icon: 'none'
            })
            this.triggerEvent("getData", "pay")
          }
        })
      }
    }
  }
})