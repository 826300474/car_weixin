let baseURl = 'https://pacaio.match.qq.com'
export default function request(data) {
  let { url, params = '', method = 'GET' } = data;
  return new Promise(function (resolve, reject) {
    wx.request({
      url: baseURl + url,
      data: params,
      header: {
        'content-type': 'application/json',
        'Authorization': 'Bearer xxxxxxxxxxxxx',
      },
      success(res) {
        const data = res.data
        if (data.code === 0 ){
          resolve(data.data)
        }
      }
    })
  })
}