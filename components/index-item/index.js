// components/IndexItem/index.js
Component({
  options: {
    // styleIsolation: 'apply-shared'
  },
  properties: {
    propData: {
      type: Object
    },
  },
  created:function(){
    // console.log(this.data.propData)
  },
  data: {

  },
  methods: {
    goto: function() {
      let data = this.data.propData;
      // console.log(data)
      // return;
      if (data.type === 1) {
        wx.navigateTo({
          url: '/pages/xqwenzhang/index?id=' + data.id,
        })
      } else {
        wx.navigateTo({
          url: '/pages/xqvideo/index?id=' + data.id,
        })
      }

    }
  },
})