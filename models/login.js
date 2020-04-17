import {
  HTTP
} from '../utils/http.js'

const app = getApp();

export class LoginModel extends HTTP {
  userInsert_update(id, name, pwd, token, openid, room = '', wxtoken, type, encoded, sCallback) {
    this.request({
      url: `App.User.Insert_update&id=${id}&name=${name}&pwd=${pwd}&token=${token}&openid=${openid}&room=${room}&wxtoken=${wxtoken}&type=${type}&encoded=${encoded}`,
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

  userGet(id, sCallback) {
    this.request({
      url: `App.User.Get&id=${id}`,
      success: (res) => {
        sCallback(res)
      }
    })
  }
}