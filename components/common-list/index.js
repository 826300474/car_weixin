import {
  getList
} from '../../api/index.js'
Component({
  properties: {
    propParam:Object
  },
  data: {
    list: [],
    pageNum: 1,
    pageSize: 5
  },
  ready: function() {
    this.getData("shuaxin")
  },
  methods: {
    getData(type) {
      if (type ==="shuaxin"){
        this.setData({
          pageNum: 1
        })
      }else{
        this.setData({
          pageNum: this.data.pageNum + 1
        })
      }
      let data = {
        pageNum: this.data.pageNum,
        pageSize: this.data.pageSize,
        ...this.data.propParam
      }
      getList(data).then(data => {
        wx.stopPullDownRefresh()
        if (type === 'shuaxin') {
          this.setData({
            list: [...data.content]
          })
        } else {
          this.setData({
            list: [...data.content, ...this.data.list],
          })
        }
      })
    }
  }
})