import {
  HTTP
} from '../utils/http.js'

const app = getApp();

export class LoginModel extends HTTP {
  login(xh, password, sCallback) {
    this.request({
      url: `App.QZAPI.Login&xh=${xh}&password=${password}`,
      success: (res) => {
        wx.setStorageSync('token', res)
        sCallback(res)
      }
    })
  }
  
  userInsert_update(id, name, pwd, token, openid, room='', wxtoken, type, sCallback) {
    this.request({
      url: `App.User.Insert_update&id=${id}&name=${name}&pwd=${pwd}&token=${token}&openid=${openid}&room=${room}&wxtoken=${wxtoken}&type=${type}`,
      success: (res) => {
        sCallback(res)
      }
    })
  }

  getOpenid(code, sCallback) {
    this.request({
      url: `App.Wx.GetOpenid&code=${code}`,
      success: (res) => {
        wx.setStorageSync('openid', res)
        sCallback(res)
      }
    })
  }
  getUserInfo(xh, token, sCallback) {
    this.request({
      url: `App.QZAPI.GetUserInfo&xh=${xh}&token=${token}`,
      success: (res) => {
        wx.setStorageSync('stuInfo', res)
        sCallback(res)
      }
    })
  }
  getCurrentTime2(token, sCallback) {
    this.request({
      url: `App.QZAPI.GetCurrentTime&token=${token}`,
      success: (res) => {
        wx.setStorageSync('termdata', res)
        sCallback(res)
      }
    })
  }
  userGet(id, sCallback) {
    this.request({
      url:`App.User.Get&id=${id}`,
      success:(res) => {
        sCallback(res)
      }
    })
  }
}