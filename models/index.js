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
  getCetId(cookie, name, idNumber, verificationCode, sCallback) {
    this.request({
      url: `App.CET.GetId&cookie=${cookie}&IDNumber=${idNumber}&Name=${name}&verificationCode=${verificationCode}`,
      success: (res) => {
        try {
          if (res.ExceuteResultType == 1) {
            wx.setStorageSync('cetid', res)
          }
        } catch (e) {
          console.log("cetid()", e)
        }
        sCallback(res)
      }
    })
  }
  getCetIdV(test, sCallback) {
    this.request({
      url: `App.CET.GetIdV`,
      success: (res) => {
        sCallback(res)
      }
    })
  }
  getCet(token, sCallback) {
    this.request({
      url: `App.Hutb_Hutb.GetCet&&cookie=${token}`,
      success: (res) => {
        try {
          if (res.status) {
            wx.setStorageSync('cet', res)
          }
        } catch (e) {
          console(res)
        }
        sCallback(res)
      }
    })
  }
  getNcre(token, sCallback) {
    this.request({
      url: `App.Hutb_Hutb.GetNcre&&cookie=${token}`,
      success: (res) => {
        try {
          if (res.status) {
            wx.setStorageSync('ncre', res)
          }
        } catch (e) {
          console(res)
        }
        sCallback(res)
      }
    })
  }
  getCetS(cookie, id, name, v, sCallback) {
    this.request({
      url: `App.CET.GetCet&id=${id}&name=${name}&cookie=${cookie}&v=${v}`,
      success: (res) => {
        try {
          if (res.status) {
            wx.setStorageSync('cet', res)
          }
        } catch (e) {
          console(res)
        }
        sCallback(res)
      }
    })
  }
  getCetSV(id, sCallback) {
    this.request({
      url: `App.CET.GetCetV&id=${id}`,
      success: (res) => {
        sCallback(res)
      }
    })
  }
}