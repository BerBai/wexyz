//app.js
import {
  IndexModel
} from '/models/index.js'
let indexModel = new IndexModel()

import {
  LoginModel
} from '/models/hutblogin.js'
let loginModel = new LoginModel()

App({
  version: 'v1.0.0', //版本号

  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    var _this = this;
    //读取缓存
    try {
      _this._user['wx'] = wx.getStorageSync('wxuser');
      _this._user['user'] = wx.getStorageSync('stuInfo');
      _this._time = wx.getStorageSync('termdata');

      var token = wx.getStorageSync('token')
      _this._token = token

    } catch (e) {
      console.warn('获取缓存失败');
    }
  },
  //提示
  showLoadToast: function(title, duration) {
    wx.showToast({
      title: title || '加载中',
      icon: 'loading',
      mask: true,
      duration: duration || 10000
    });
  },
  //带返回页面的提示
  showTips(title, content, pages = '', tabPages = '') {
    wx.showModal({
      title: title,
      content: content,
      showCancel: false,
      success(e) {
        if (pages) {
          //返回到普通页面
          wx.navigateTo({
            url: pages
          })
        } else if (tabPages) {
          // 返回到tab页面
          wx.switchTab({
            url: tabPages
          })
        }
      }
    })
  },
  //判断是否有登录信息，让分享时自动登录
  loginLoad: function(onLoad) {
    var _this = this;
    if (!_this._token) { //无登录信息
      wx.showModal({
        title: '无权限',
        content: '请先授权登录并绑定',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.switchTab({
              url: '/pages/user/user',
            })
          }
        }
      })
    } else { //有登录信息
      typeof onLoad == "function" && onLoad();
    }
  },
  // 微信授权/openid
  getWxInfo() {
    var _this = this
    wx.login({
      success: function(res) {
        // console.log('success')
        // console.log(res)
        if (res.code) {
          //发送请求
          loginModel.getOpenid(res.code, (opid) => {
            // console.log(opid)
            _this.opid = opid
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  // 获取学期信息
  getCurrentTime: function() {
    var _this = this
    loginModel.getCurrentTime('', (res) => {
      _this._time = res
    })
    console.log('app.getCurrentTime', _this._time)
    return _this._time
  },
  // 计算全部学期并获取成绩
  getScores: function() {
    var _this = this
    // 从缓存中获取
    var terms = wx.getStorageSync('terms') || []
    _this._token = wx.getStorageSync('token')

    // 计算全部学期
    if (terms.length == 0 && this._user) {
      var i, j, z = 0,
        year = parseInt(this._user.user.rxnf)
      for (i = 1; i <= 4; i++) {
        for (j = 1; j <= 2; j++) {
          terms[z] = year + '-' + (year + 1) + '-' + j
          z++
        }
        year++
      }
      wx.setStorageSync('terms', terms)
    }
    // 获取成绩
    var token = wx.getStorageSync('token'),
      scores = [],
      i
    for (i = 0; i < terms.length; i++) {
      scores[i] = wx.getStorageSync(terms[i])
      if (scores[i].length == 0) {
        indexModel.getCjcx(token.id, token.token, terms[i], (res) => {
          // console.log(res)
        })
      }
    }
    this.scores = scores
  },
  _user: {
    //微信数据
    wx: {},
    //学生或老师数据
    user: {}
  },
  _time: {}, //当前学期周数
  _token: '',
  scores: {},
  notices: {},
  stuInfo: {},
  opid: {}
})