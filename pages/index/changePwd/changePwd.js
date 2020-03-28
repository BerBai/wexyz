// pages/user/changePwd/changePwd.js
import {
  LoginModel
} from '../../../models/hutblogin.js'

let loginModel = new LoginModel()
//获取应用实例
var app = getApp();
const isPwd = (value) => !/^(?=.*[0-9])(?=.*[a-zA-Z])(.{8,})$/.test(value)

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid_focus: false,
    oldpasswd_focus: false,
    passwd1_focus: false,
    passwd2_focus: false,
    username: '',
    oldPwd: '',
    pwd1: '',
    pwd1error: '',
    pwd2: '',
    pwd2error: '',
    tip: '',
    isSubmit: false,
  },
  inputFocus: function(e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': true
      });
    } else if (e.target.id == 'oldpasswd') {
      this.setData({
        'oldpasswd_focus': true
      });
    } else if (e.target.id == 'passwd1') {
      this.setData({
        'passwd1_focus': true
      });
    } else if (e.target.id == 'passwd2') {
      this.setData({
        'passwd2_focus': true
      });
    }
  },
  inputBlur: function(e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': false
      });
    } else if (e.target.id == 'oldpasswd') {
      this.setData({
        'oldpasswd_focus': false
      });
    } else if (e.target.id == 'passwd1') {
      this.setData({
        'passwd1_focus': false
      });
    } else if (e.target.id == 'passwd2') {
      this.setData({
        'passwd2_focus': false
      });
    }
  },
  useridInput: function(e) {
    this.setData({
      username: e.detail.value
    });
    if (e.detail.value.length >= 9) {
      wx.hideKeyboard();
    }
  },
  passwd1Input: function(e) {
    if (isPwd(e.detail.value)) {
      this.setData({
        tip: '密码至少8位且包含数字、字母'
      })
    } else {
      this.setData({
        tip: '',
      })
    }
    this.setData({
      pwd1error: isPwd(e.detail.value),
      pwd1: e.detail.value
    });
  },
  oldpasswdInput: function(e) {
    this.setData({
      oldPwd: e.detail.value
    });
  },
  passwd2Input: function(e) {
    if (this.data.pwd1 != e.detail.value) {
      this.setData({
        tip: '密码不一致',
        pwd2error: true
      })
    } else if (this.data.pwd1 == e.detail.value) {
      this.setData({
        tip: '',
        pwd2error: false
      })
    }
    this.setData({
      pwd2: e.detail.value
    });
  },

  showLoad(title, duration) {
    wx.showLoading({
      title: title,
      icon: 'loading',
      mask: true,
      duration: duration || 10000
    })
  },

  next(e) {
    var _this = this
    var oldPwd = _this.data.oldPwd,
      pwd1 = _this.data.pwd1,
      pwd2 = _this.data.pwd2,
      pwd1error = _this.data.pwd1error,
      pwd2error = _this.data.pwd2error,
      username = _this.data.username

    console.log(username, oldPwd, pwd1, pwd2)
    if (username && oldPwd && pwd1 && pwd2) {
      if (pwd1error) {
        // console.log(telerror || emailerror)s
        app.showTips('提示', '新密码至少8位且包含数字、字母')
      } else if (pwd2error) {
        app.showTips('提示', '两次密码不一致')
      } else {
        _this.showLoad('提交中')
        _this.setData({
          isSubmit: true
        })
        loginModel.changePwd(username, oldPwd, pwd1, pwd2, (res) => {
          console.log(res)
          if (res.success) {
            //修改成功，提示并存储修改后的账户信息
            var openid = wx.getStorageSync('openid')
            console.log(res.number, res.name, res.password, res.token, openid.openid)
            loginModel.userInsert_update(res.number, res.name, res.password, res.token, openid.openid, '', '', '2', (res) => {
              console.log('user,有id号则插入成功', res)
            })

            wx.hideLoading()
            wx.setStorageSync('token', res)
            app.showTips('修改成功', '密码已修改成功，请牢记新密码', '', '/pages/index/index')
          } else if(!res.success){
            // 原密码错误
            wx.hideLoading()
            app.showTips(res.msg,res.tip)
          }
          _this.setData({
            isSubmit: false
          })
        })
      }
    } else {
      app.showTips('信息不完全', '请检查是否有未填项')
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})