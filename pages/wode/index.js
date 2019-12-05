import {
  profile,
  sign
} from '../../api/index.js'
Page({
  data: {
    useInfo: "",
    profileData: "",
  },
  onLoad: function (options) {
    this.getData();
  },
  sign: function () {
    if (!this.data.profileData.isSigned) {
      sign().then(data => {
        this.getData();
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
  },
  goto: function (e) {
    wx.navigateTo({
      url: '/pages/mybuy/index?type=' + e.target.id,
    })
  },
  ziliao: function () {
    wx.navigateTo({
      url: '/pages/ziliao/index?code=' + this.data.profileData.invitorState
    })
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