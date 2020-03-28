import {
  HTTP
} from '../utils/http.js'

export class ZanlogModel extends HTTP {
  // 获取赞赏日记
  getZanlist(page, perpage, sCallback) {
    this.request({
      url: `App.Zanlog.GetList&page=${page}&perpage=${perpage}`,
      success: (res) => {
        // console.log(res.items)
        sCallback(res.items)
      }
    })
  }
}