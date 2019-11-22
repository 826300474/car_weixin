const app = getApp()
import {
  getBanner, getBehavior
} from '../../api/index.js'
Page({
  data: {
    listParam:{
      type:1  
    },
    banner: [],
    behavior:[]
  },
  onLoad: function() {
    this.getBanner()
    this.getBehavior()
  },
  getBanner:function(){
    getBanner().then(data=>{
      this.setData({
        banner:data
      })
    })
  },
  getBehavior:function(){
    getBehavior().then(data=>{
      this.setData({
        behavior: data
      })
    })
  },
  goto:function(e){
    let index = Number(e.currentTarget.id)
    let data = this.data.banner[index]
    if (data.type === 1) {
      wx.navigateTo({
        url: '/pages/xqwenzhang/index?id=' + data.id,
      })
    } else {
      wx.navigateTo({
        url: '/pages/xqvideo/index?id=' + data.id,
      })
    }
  },
  onReady:function(){
    this.commonList = this.selectComponent("#commonList")
  },
  onReachBottom: function() {
    this.commonList.getData("more")
  },
  onPullDownRefresh: function() {
    this.commonList.getData("shuaxin")
  }
})