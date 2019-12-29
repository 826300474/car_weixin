import {
  getXq,
  createOrders
} from '../../api/index.js'
Page({
  data: {
    id: "",
    number: 1,
    address: "",
    pay_type: false
  },
  onLoad: function (options) {
    let that = this;
    wx.getStorage({
      key: 'address',
      success: function (res) {
        that.setData({
          address: JSON.parse(res.data)
        })
      },
    })
    this.setData({
      id: options.id,
      number: options.number
    })
    this.getData(options.id)
  },
  onReady: function () {

  },
  address: function () {
    let that = this;
    wx.chooseAddress({
      success(res) {

        wx.setStorage({
          key: 'address',
          data: JSON.stringify(res),
        })

        that.setData({
          address: res
        })
      }
    })
  },
  getData: function (id) {
    getXq({
      id: id
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
  toBug: function () {
    if(!this.data.address){
      wx.showToast({
        title: '请选择地址',
        icon:'none'
      })
      return;
    }
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
  },
  buy_next: function (e) {
    this.setData({
      pay_type: false,
    })
    var that = this;
    createOrders({
      articleId: this.data.id,
      payType: e.detail.value,
      quantity:this.data.number,
      address: {
        province: this.data.address.provinceName,
        city: this.data.address.cityName,
        area: this.data.address.countyName,
        detail: this.data.address.detailInfo,
        mobile: this.data.address.telNumber,
        realname: this.data.address.userName
      },
    }).then(data => {
      if (e.detail.value === 1) {
        wx.requestPayment({
          timeStamp: data.timeStamp,
          nonceStr: data.nonceStr,
          package: data.package,
          signType: 'MD5',
          paySign: data.paySign,
          success(res) {
            // wx.showToast({
            //   title: '支付成功',
            //   icon: 'none'
            // })
            let param = {
              type: 'success',
              title: "付款成功",
              desc: "",
              handle: [{
                type: "primary",
                text: "返回首页",
                tap: "./../index/index"
              }],
            };
            wx.navigateTo({
              url: './../msg/index?data=' + JSON.stringify(param),
            })
          },
          fail(res) {
            wx.showToast({
              title: '支付失败',
              icon: 'none'
            })
          }
        })
      } else {
        // wx.showToast({
        //   title: '支付成功',
        //   icon: 'none'
        // })
        let param = {
          type: 'success',
          title: "付款成功",
          desc: "",
          handle: [{
            type: "primary",
            text: "返回首页",
            tap: "./../index/index"
          }],
        };
        wx.navigateTo({
          url: './../msg/index?data=' + JSON.stringify(param),
        })
      }
    })
  }
})