// components/IndexItem/index.js
Component({
  options: {
    // styleIsolation: 'apply-shared'
  },
  properties: {
    propData:{
      type:Object
    },
  },
  data: {

  },
  methods: {
    goto: function () {
      wx.navigateTo({
        url: '/pages/xqvideo/index',
      })
    }
  },
})
