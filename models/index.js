import {
  HTTP
} from '../utils/http.js'

export class IndexModel extends HTTP {
  // 控制功能
  getFunc(page, perpage, state, sCallback) {
    this.request({
      url: `App.Func.GetList&page=${page}&perpage=${perpage}&state=${state}`,
      success: (res) => {
        // console.log(res.items)
        sCallback(res)
      }
    })
  }


  getTimetable(xh, token, sCallback) {
    this.request({
      url: `App.QZAPI.GetTimetable&xh=${xh}&token=${token}`,
      success: (res) => {
        wx.setStorageSync('timetable', res)
        sCallback(res)
      }
    })
  }
  getCurrentTime(token, sCallback) {
    this.request({
      url: `App.QZAPI.GetCurrentTime&token=${token}`,
      success: (res) => {
        wx.setStorageSync('termdata', res)
        sCallback(res)
      }
    })
  }
  getCjcx(xh, token, xnxqh, sCallback) {
    this.request({
      url: `App.QZAPI.GetCjcx&xh=${xh}&xnxqh=${xnxqh}&token=${token}`,
      success: (res) => {
        wx.setStorageSync(xnxqh, res.result)
        sCallback(res)
      }
    })
  }
  getNotice(sCallback) {
    this.request({
      url: `App.Notice.GetNotice`,
      success: (res) => {
        sCallback(res)
      }
    })
  }
  getIndexImg(sCallback) {
    this.request({
      url: `App.IndexImg.GetIndexImg`,
      success: (res) => {
        sCallback(res)
      }
    })
  }
  getKxJscx(idleTime, token, time, xqid = '', jxlid = '', sCallback) {
    this.request({
      url: `App.QZAPI.GetKxJscx&idleTime=${idleTime}&jxlid=${jxlid}&time=${time}&token=${token}&xqid=${xqid}`,
      success: (res) => {
        sCallback(res)
      }
    })
  }
  getKscx(token, sCallback) {
    this.request({
      url: `App.QZAPI.GetKscx&token=${token}`,
      success: (res) => {
        sCallback(res)
      }
    })
  }
  getTotal(sCallback) {
    this.request({
      url: `App.User.GetTotal`,
      success: (res) => {
        sCallback(res)
      }
    })
  }
  getCalendar(sCallback) {
    this.request({
      url: `App.Calendar.GetCalendar`,
      success: (res) => {
        sCallback(res)
      }
    })
  }

  getDepartment(page, perpage, sCallback) {
    this.request({
      url: `App.Department.GetList`,
      success: (res) => {
        sCallback(res)
      }
    })
  }
}