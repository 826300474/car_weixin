import {
  getXq
} from '../../api/index.js'
Page({
  data: {
    myId:"1",
    content:""
  },
  onLoad: function (options) {
    if (options.id){
      this.setData({
        myId: options.id
      })
      this.getData()
    }
    this.getData()
  },
  getData:function(){
    getXq({ id: this.data.myId }).then(data=>{
      this.setData({
        content:data
      })
    })
  }
})