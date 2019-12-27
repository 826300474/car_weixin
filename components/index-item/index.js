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
  methods: {
    goto: function () {
      let data = this.data.propData;
      console.log(data.type)
      if (data.type === 1) {
        wx.navigateTo({
          url: '/pages/xqwenzhang/index?id=' + (data.articleId ? data.articleId : data.id),
        })
      } else if (data.type === 2) {
        wx.navigateTo({
          url: '/pages/xqvideo/index?id=' + (data.articleId ? data.articleId : data.id),
        })
      } else if (data.type === 3) {
        wx.navigateTo({
          url: '/pages/xqshop/index?id=' + (data.articleId ? data.articleId : data.id),
        })
      }

    }
  },
})