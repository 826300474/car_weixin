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
  data: {

  },
  methods: {
    goto: function() {

      let data = this.data.propData;
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