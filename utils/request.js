let baseURl = 'http://car.api.veeshang.com'
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
          'Authorization': 'Bearer ' + value,
        },
        success(res) {
          const data = res.data
          if (data.code === 200) {
            resolve(data.data)
          }
        }
      })
    })
  } catch (e) {
    
  }
}