import {
  HTTP
} from '../utils/http.js'

const app = getApp();

export class LoginModel extends HTTP {
  login(xh, password, sCallback) {
    this.request({
      url: `App.Hutb_Hutb.LoginNoVerifycode&username=${xh}&password=${password}`,
      success: (res) => {
        wx.setStorageSync('token', res)
        sCallback(res)
      }
    })
  }
  reLogin(encoded, sCallback) {
    this.request({
      url: `App.Hutb_Hutb.ReLogin&encoded=${encoded}`,
      success: (res) => {
        wx.setStorageSync('token', res)
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
  getUserInfo(token, sCallback) {
    this.request({
      url: `App.Hutb_Hutb.GetUserInfo&cookie=${token}`,
      success: (res) => {
        wx.setStorageSync('stuInfo', res)
        sCallback(res)
      }
    })
  }
  // 不需要token参数，回调函数不能在第一个参数
  getCurrentTime(token, sCallback) {
    this.request({
      url: `App.Hutb_Hutb.GetCurrentTime`,
      success: (res) => {
        wx.setStorageSync('termdata', res)
        sCallback(res)
      }
    })
  }
  userInsert_update(id, name, pwd, token, openid, room = '', wxtoken, type, sCallback) {
    this.request({
      url: `App.User.Insert_update&id=${id}&name=${name}&pwd=${pwd}&token=${token}&openid=${openid}&room=${room}&wxtoken=${wxtoken}&type=${type}`,
      success: (res) => {
        sCallback(res)
      }
    })
  }
  changePwd(username, oldPwd, pwd1, pwd2, sCallback) {
    this.request({
      url: `App.Hutb_Hutb.ChangePwd&username=${username}&oldpassword=${oldPwd}&password1=${pwd1}&password2=${pwd2}`,
      success: (res) => {
        sCallback(res)
      }
    })
  }
  userGet(id, sCallback) {
    this.request({
      url: `App.User.Get&id=${id}`,
      success: (res) => {
        sCallback(res)
      }
    })
  }
  getUsername(username, sCallback) {
    this.request({
      url: `App.Hutb_Hutb.GetUsername&username=${username}`,
      success: (res) => {
        sCallback(res)
      }
    })
  }
  getPwd(username, token, question1, ans1, question2, ans2, sCallback) {
    this.request({
      url: `App.Hutb_Hutb.GetPwd&username=${username}&cookie=${token}&question1=${question1}&ans1=${ans1}&ans2=${ans2}&question2=${question2}`,
      success: (res) => {
        sCallback(res)
      }
    })
  }
  getTimetable(token, xn, zc, sCallback) {
    this.request({
      url: `App.Hutb_Hutb.GetTabletime&xn=${xn}&cookie=${token}&zc=${zc}`,
      success: (res) => {
        wx.setStorageSync('timetable', res),
        sCallback(res)
      }
    })
  }
}