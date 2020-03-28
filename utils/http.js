import {
  config
} from '../config.js'

//待补充
const tips = {
  1: '请检查网络',
  400: '没找到资源，请反馈',
  5: '错误网关'
}

export class HTTP {
  request(params) {
    if (!params.method) {
      params.method = "GET"
    }
    wx.request({
      url: config.api_base_url + params.url,
      method: params.method,
      data: params.data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success: (res) => {
        // 获取状态码2XX 3XX 4XX 等
        let code = res.statusCode.toString()
        if (code.startsWith('2')) {
          //返回数据 首先判断是否为空
          params.success && params.success(res.data.data)
        } else {
          let error_code = res.data.ret
          this._show_error(error_code)
        }
      },
      fail: (res) => {
        //其它错误返回 1
        this._show_error(1) 
      }
    })
  }

  _show_error(error_code) {
    wx.showToast({
      title: tips[error_code],
      icon: 'none',
      duration: 2000
    })
  }
}