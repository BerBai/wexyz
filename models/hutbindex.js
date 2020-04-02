import {
  HTTP
} from '../utils/http.js'

const app = getApp();

export class HutbIndexModel extends HTTP {
  getFreeClassroom(token, xnxqh, xqid, jzwid, zc1, zc2, jc1, jc2, sCallback) {
    this.request({
      url: `App.Hutb_FreeClassroom.GetFreeClassroom&cookie=${token}&xnxqh=${xnxqh}&xqid=${xqid}&jzwid=${jzwid}&zc1=${zc1}&zc2=${zc2}&jc1=${jc1}&jc2=${jc2}`,
      success: (res) => {
        wx.setStorageSync('freeroom', res)
        sCallback(res)
      }
    })
  }
  getScore(token, xn, sCallback) {
    this.request({
      url: `App.Hutb_Hutb.GetScore&cookie=${token}&xn=${xn}`,
      success: (res) => {
        console.log(res)
        if (res.status)
          wx.setStorageSync(xn, res.data)
        sCallback(res)
      }
    })
  }
}