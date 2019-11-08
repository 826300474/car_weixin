import {
  getList
} from '../../api/index.js'
Page({
  data: {
    videoURL:'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
    playState:true,
    list:[]
  },
  onLoad: function (options) {
    this.getData();
  },
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  timeupdate:function(e){
    if (e.detail.currentTime > 1 ){
      this.videoContext.pause()
      this.setData({
        playState: false
      })
    } 
  },
  getData: function () {
    let data = {
      cid: 56,
      ext: 'games',
      token: 'c786875b8e04da17b24ea5e332745e0f',
      num: 3,
      expIds: '20190106A13PFT % 7C20190108A04MLS',
    }
    getList(data).then(data => {
      wx.stopPullDownRefresh()
      this.setData({
        list: [...data, ...this.data.list]
      })
    })
  },
})