
import {
  invitor,
  config
} from '../../api/index.js'
Page({
  data: {
    state:"",
    fenxiaoArticle:"",
    stateName:{
      '-1': '您被拒绝成为分销者',
      '0':'我要成为分销者',
      '1': '申请中，请耐心等待',
    }
  },
  onLoad: function (options) {
    this.setData({
      state: options.data
    })
    this.getData()
  },
  getData:function(){
    config().then(data=>{
      this.setData({
        fenxiaoArticle: data.fenxiaoArticle.replace(/<img/g, '<img style="width:100%" ')
      })
    })
  },
  onReady: function () {

  },
  onShow: function () {

  },
  invitor:function(){
    invitor().then(data=>{
      let param = {
        type: 'success',
        title: "分销资料申请成功",
        desc: "审核通过后可使用分销功能",
        handle: [{
          type: "primary",
          text: "返回首页",
          tap: "./../index/index"
        }],
      };
      wx.navigateTo({
        url: './../msg/index?data=' + JSON.stringify(param),
      })
    })
  }
})