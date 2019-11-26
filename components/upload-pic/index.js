// components/upload-pic/index.js
Component({
  properties: {
    files:Array,
    max:Number
  },
  data: {

  },
  methods: {
    chooseImage:function(){
      this.triggerEvent('chooseImage')
    },
    look:function(e){
      wx.previewImage({
        current: this.data.files.map(item => item.url)[e.currentTarget.id],
        urls: this.data.files.map(item=>item.url)
      })
    },
    close:function(e){
      this.triggerEvent('closeImage', e.currentTarget.id)
    }
  }
})
