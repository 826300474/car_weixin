// pages/success/index.js
Page({
  data: {
    title:'',
    msg:''
  },
  onLoad: function (options) {
    let data = JSON.parse(options.data);
    this.setData({
      title:data.title,
      msg:data.msg
    })
  },
})