let baseURl = 'https://car.api.veeshang.com'
export default function request(data) {
  let {
    url,
    params = '',
    method = 'GET'
  } = data;

  try {
    var value = wx.getStorageSync('openId') || "";

    return new Promise(function(resolve, reject) {
      wx.request({
        url: baseURl + url,
        data: params,
        method: method,
        header: {
          'content-type': 'application/json',
          'Authorization': value,
        },
        success(res) {
          const data = res.data
          if (data.code === 200) {
            resolve(data.data)
          }else{
            wx.showToast({
              title: data.message,
              icon:'none'
            })
          }
        }
      })
    })
  } catch (e) {
    
  }
}