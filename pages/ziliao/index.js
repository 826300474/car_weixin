import {
  profile,
  attachment,
  reg,
  allbytype
} from '../../api/index.js'
Page({
  data: {
    hangData: [],
    files: [],
    region: [],
    array: [],
    index: "",
    shopName: "",
    maxNum: 1,
    loading: false
  },
  onLoad() {
    this.getData()
  },
  bindMultiPickerColumnChange: function (e) {
    if (e.detail.column === 0) {
      let hangData = this.data.hangData;
      let id = hangData.filter(item => item.parentId === 0)[e.detail.value]['id'];
      let secData = hangData.filter(item => item.parentId === id)
      let arry = this.data.array;
      arry[1] = [...secData];
      console.log(arry)
      this.setData({
        array: arry
      })
    }
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      count: this.data.maxNum - this.data.files.length,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        wx.uploadFile({
          url: 'https://car.api.veeshang.com/app/attachment', //仅为示例，非真实的接口地址
          filePath: res.tempFilePaths[0],
          name: 'file',
          success(res) {
            const urls = JSON.parse(res.data)['data'];
            that.setData({
              files: that.data.files.concat({
                url: urls
              })
            });
          }
        })
      }
    })
  },
  closeImage: function (e) {
    // console.log(this.data.files.splice(e.detail, 1) )
    let newData = this.data.files;
    let aaanewData = newData.splice(e.detail, 1)
    this.setData({
      files: this.data.files
    })
  },
  getData: function () {
    profile().then(data => {
      allbytype({
        type: "profession",
        pid: 0
      }).then(data1 => {
        this.setData({
          array: data1
        })
        let index;
        for (let i = 0; i < data1.length; i++ ) {
          if (data1[i]['name'] === data.profession){
            index = i;
          }
        }
        let region = []
        if (data.province && data.city && data.area) {
          region = [data.province, data.city, data.area]
        }
        let files = [];
        if (data.businessCertificate) {
          files.push({ url: data.businessCertificate })
        }
        if (data.businessCertificate2) {
          files.push({ url: data.businessCertificate2 })
        }
        this.setData({
          region: region,
          index: index,
          shopName: data.shopName,
          files: files
        })
      })

    })
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  formSubmit: function (e) {
    
    console.log(e.detail.value )

    if (e.detail.value.diqu.length === 0 ){
      wx.showToast({
        title: '请选择地区',
        icon:'none'
      })
      return;
    }

    if (e.detail.value.hangye === ""  ){
      wx.showToast({
        icon:'none',
        title: '请选择行业',
      })
      return;
    } 

    if (!e.detail.value.shopName) {
      wx.showToast({
        icon:'none',
        title: '请填写门店名称',
      })
      return;
    }   

    if (this.data.files.length === 0){
      wx.showToast({
        icon:'none',
        title: '请上传门店照片或营业执照',
      })
      return;
    }

    let businessCertificate;
    let businessCertificate2;
    if (this.data.files[0]) {
      businessCertificate = this.data.files[0]['url']
    }else{
      businessCertificate = ""
    }
    if (this.data.files[1]) {
      businessCertificate2 = this.data.files[1]['url']
    }else{
      businessCertificate2 = ""
    }
    let data = {
      "province": e.detail.value.diqu[0],
      "city": e.detail.value.diqu[1],
      "area": e.detail.value.diqu[2],
      "businessCertificate": businessCertificate,
      "businessCertificate2": businessCertificate2,
      "profession": this.data.array[this.data.index]['name'],
      "shopName": e.detail.value.shopName
    }
    reg(data).then(data => {
      let param = {
        type: 'success',
        title: "申请资料成功",
        desc: "审核通过后可体验全部功能",
        handle: [{
          type: "primary",
          text: "返回首页",
          tap: "./../index/index"
        }],
      };
      wx.navigateTo({
        url: './../msg/index?data=' + JSON.stringify(param),
      })
    })
  }
})