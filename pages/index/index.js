const app = getApp()
import {
  getList
} from '../../api/index.js'
Page({
  data: {
    listParam:{
      type:1  
    },
    banner: ["https://pic.qqtn.com/up/2019-11/2019110408121188043.jpg", "https://pic.qqtn.com/up/2019-11/2019110408121188043.jpg", "https://pic.qqtn.com/up/2019-11/2019110408121188043.jpg"],
    
  },
  onLoad: function() {
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