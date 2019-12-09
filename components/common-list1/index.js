import {
  getList
} from '../../api/index.js'
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
  },
  data: {
    list: [],
    pageNum: 1,
    pageSize: 5
  },
  ready: function () {
    try {
      var value = wx.getStorageSync('openId')
      if (value) {
        if (this.data.propType === 'def') {
          this.getData("shuaxin")
        }
      }
    } catch (e) {

    }

  },
  methods: {
    getData(type) {
      if (type === "shuaxin") {
        this.setData({
          pageNum: 1
        })
        wx.showLoading({
          title: '加载中...',
        })
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
        if (type === 'shuaxin') {
          // console.log(555)
          this.setData({
            list: [...newData]
          })
        } else {
          this.setData({
            list: [...newData, ...this.data.list],
          })
        }
      })
    }
  }
})