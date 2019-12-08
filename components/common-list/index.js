import {
  getList
} from '../../api/index.js'

const createRecycleContext = require('../../weui-miniprogram/miniprogram_npm/miniprogram-recycle-view/index.js')
let ctx;
Component({
  properties: {
    propParam: Object,
    propData: Array,
    propType: {
      type: String,
      value: 'def'
    },
    propAaa: {
      type: Object,
      value: {
        data: getList
      }
    },
    propId:String
  },
  data: {
    pageNum: 1,
    pageSize: 5
  },
  ready: function () {
    // console.log(555)
    // console.log(ctx)
    // if ( ctx ){
    //   ctx.destroy()
    // }
    ctx = createRecycleContext({
      id: 'recycleId' + this.data.propId,
      dataKey: 'recycleList',
      page: this,
      itemSize: this.itemSizeFunc
    })
    this.getData("shuaxin")
  },
  detached: function () {
    ctx.destroy()
  },
  methods: {
    itemSizeFunc: function (item, idx) {
      let width, height;
      if (item.type === 1) {
        if (item.picsArray && item.picsArray.length > 2) {
          height = ctx.transformRpx(280)
        } else {
          height = ctx.transformRpx(170)
        }
      } else {
        height = ctx.transformRpx(415)
      }
      return {
        width: ctx.transformRpx(750),
        height: height
      }
    },
    getData(type) {
      if (type && type === "shuaxin") {
        this.setData({
          pageNum: 1
        })
        wx.showLoading({
          title: '加载中...',
        })
        // ctx.splice(0, 1000, [], () => {
        //   // console.log(555)
        // })
      } else {
        this.setData({
          pageNum: this.data.pageNum + 1
        })
      }
      let data = {
        pageNum: this.data.pageNum,
        pageSize: this.data.pageSize,
        ...this.data.propParam
      }
      this.data.propAaa.data(data).then(data => {
        wx.hideLoading()
        wx.stopPullDownRefresh()
        let newData = data.length ? data : data.records
        newData.forEach(item => {
          if (item.picsArray) {
            item.picsArray = item.picsArray.slice(0, 3)
          }
        })
        
        ctx.append([...newData])
        // if (type === 'shuaxin') {
        //   // console.log(555)
        //   this.setData({
        //     list: [...newData]
        //   })
        // } else {
        //   this.setData({
        //     list: [...newData, ...this.data.list],
        //   })
        // }
      })
    }
  }
})
