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
        try {
          if (res.status)
            wx.setStorageSync(xn, res.data)
        } catch (e) {
          console.log('getS() error')
        }
        sCallback(res)
      }
    })
  }
  getCourseInfo(token, xnxqh, skyx, kkyx, sCallback) {
    this.request({
      url: `App.Hutb_Auditing.GetCourseInfo&cookie=${token}&xnxqh=${xnxqh}&kkyx=${kkyx}&skyx=${skyx}`,
      success: (res) => {
        console.log(res)
        sCallback(res)
      }
    })
  }
  getAuditing(token, xnxqh, kc, sCallback) {
    this.request({
      url: `App.Hutb_Auditing.GetAuditing&cookie=${token}&xnxqh=${xnxqh}&kc=${kc}`,
      success: (res) => {
        console.log(res)
        sCallback(res)
      }
    })
  }
  getDf(roomverify, sCallback) {
    this.request({
      url: `App.Wanmei.GetDf&roomverify=${roomverify}`,
      success: (res) => {
        console.log(res)
        try {
          if (res.returnmsg == 'SUCCESS') {
            wx.setStorageSync('df', res);
          }
        } catch (e) {
          console.log('getDf error')
        }
        sCallback(res)
      }
    })
  }
  getSf(roomverify, sCallback) {
    this.request({
      url: `App.Wanmei.GetSf&roomverify=${roomverify}`,
      success: (res) => {
        console.log(res)
        try {
          if (res.returnmsg == 'SUCCESS') {
            wx.setStorageSync('sf', res);
          }
        } catch (e) {
          console.log('getSf error')
        }
        sCallback(res)
      }
    })
  }
}