const app = getApp()
import {
  getBanner, getBehavior
} from '../../api/index.js'
import { openLogin } from "../../utils/util.js"
Page({
  data: {
    listParam:{
      type:1  
    },
    banner: [],
    behavior:[]
  },
  onLoad: function (options) {
    console.log('erweima_index', options)
    // if (options.scene) {
    //   let scene = decodeURIComponent(options.scene);
    //   console.log(scene )
    // }
    //登录
    try {
      var value = wx.getStorageSync('openId')
      if (!value) {
        openLogin().then(data => {
          this.getBanner()
          this.getBehavior()
          this.commonList.getData("shuaxin")
        })
      }else{
        this.getBanner()
        this.getBehavior()
      }
    } catch (e) {

    }
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
})