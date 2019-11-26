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
      type:Object,
      value:{
        data:getList
      }
    },
  },
  data: {
    list: [],
    pageNum: 1,
    pageSize: 5
  },
  ready: function() {
    if (this.data.propType === 'def') {
      this.getData("shuaxin")
    }
  },
  methods: {
    getData(type) {
      if (type === "shuaxin") {
        this.setData({
          pageNum: 1
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
        wx.stopPullDownRefresh()
        let newData = data.length ? data : data.records
        if (type === 'shuaxin') {
          this.setData({
            list: [...newData]
          })
          console.log('newData', newData)
        } else {
          this.setData({
            list: [...newData, ...this.data.list],
          })
        }
      })
    }
  }
})