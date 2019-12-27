import {
  getCategories,
  getList
} from '../../api/index.js'
import { chunk } from '../../utils/util.js'
const createRecycleContext = require('../../weui-miniprogram/miniprogram_npm/miniprogram-recycle-view/index.js')
let ctx;
Page({
  data: {
    activeId:0,
    page:1,
    pageSize: 10,
    emptyState: false,
    nav_list:[],
    data_list:[],
  },
  onReady:function(){

  },
  itemSizeFunc: function (item, idx) {
    return {
      width: ctx.transformRpx(550),
      height: ctx.transformRpx(395)
    }
  },
  onLoad: function (options) {
    getCategories({
      categoryId: '3'
    }).then(data => {
      this.setData({
        nav_list: [...data],
        activeId:data[0]['id']
      })
      this.getData("shuaxin");
    })
    // this.getData("shuaxin");
  },
  getData(type) {
    if (type && type === "shuaxin") {
      ctx = createRecycleContext({
        id: 'recycleIdShop',
        dataKey: 'recycleList',
        page: this,
        itemSize: this.itemSizeFunc
      })
      this.setData({
        pageNum: 1,
        emptyState: false
      })
      wx.showLoading({
        title: '加载中...',
      })
      if (ctx.comp ){
        ctx.splice(0, ctx.comp.sizeArray.length, [], () => {
        })
      }
    } else {
      this.setData({
        pageNum: this.data.pageNum + 1
      })
    }
    if (!this.data.emptyState) {
      let data = {
        pageNum: this.data.pageNum,
        pageSize: this.data.pageSize,
        type:3,
        categoryId:this.data.activeId
      }
      getList(data).then(data => {
        wx.hideLoading()
        wx.stopPullDownRefresh()
        let newData = data.length ? data : data.records
        newData.forEach(item => {
          if (item.picsArray) {
            item.picsArray = item.picsArray.slice(0, 3)
          }
        })
        if (newData.length) {
          ctx.append(chunk(newData, 2))
        } else {
          this.setData({
            emptyState: true
          })
        }
      })
    }
  },
  navgo:function(e){
    console.log("aaa", e.currentTarget.id, this.data.activeId)
    if (Number(e.currentTarget.id) !== this.data.activeId ){
      this.setData({
        activeId: Number(e.currentTarget.id)
      })
      this.getData("shuaxin");
    }
  },
  goto:function(e){
    wx.navigateTo({
      url: '/pages/xqshop/index?id=' + e.currentTarget.id
    })
  }
})