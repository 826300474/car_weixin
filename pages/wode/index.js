import {
  profile,
  sign,
  nickAvatar
} from '../../api/index.js'
Page({
  data: {
    useInfo: "",
    profileData: "",
  },
  onShow: function () {
    this.getData();
  },
  onLoad: function (options) {
    this.getData();
  },
  sign: function () {
    if (!this.data.profileData.isSigned) {
      sign().then(data => {
        wx.showToast({
          icon: 'none',
          title: '每日签到积分+1，积分可换购',
        })
        this.getData();
      })
    } else {
      wx.showToast({
        icon: 'none',
        title: '当前积分' + this.data.profileData.points,
      })
    }
  },
  getData: function () {
    let useInfo = wx.getStorageSync("useInfo")
    this.setData({
      useInfo: useInfo,
    })
    profile().then(data => {
      this.setData({
        profileData: data
      })
    })
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

    })

    profile().then(data => {
      this.setData({
        profileData: data
      })
      if (Number(data.customerState) === 0) {
        wx.navigateTo({
          url: '/pages/ziliao/index',
        })
      }
    })
  },
  goto: function (e) {
    wx.navigateTo({
      url: '/pages/mybuy/index?type=' + e.target.id,
    })
  },
  ziliao: function () {
    let customerState = Number(this.data.profileData.customerState);
    console.log(this.data.profileData.customerState)
    if (customerState === 0) {
      wx.navigateTo({
        url: '/pages/ziliao/index?code=' + this.data.profileData.invitorState
      })
    } else if (customerState === 1) {
      wx.showToast({
        icon: 'none',
        title: '资料审核中，请耐心等待',
      })
    } else if (customerState === 2) {
      wx.navigateTo({
        url: '/pages/ziliao/index?code=' + this.data.profileData.invitorState
      })
    } else if (customerState === -1) {
      wx.showToast({
        icon: 'none',
        title: '资料审核失败',
      })
    }
  },
  fenxiao: function () {
    wx.navigateTo({
      url: '/pages/fenxiao/index'
    })
  },
  tuichu: function () {
    let that = this;
    wx.showModal({
      title: '',
      content: '您是否确认要退出登录',
      success(res) {
        if (res.confirm) {
          wx.removeStorageSync("useInfo")
          that.getData();
        } else if (res.cancel) {

        }
      }
    })
  }
})