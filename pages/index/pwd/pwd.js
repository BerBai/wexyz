// pages/user/pwd/pwd.js
import {
  LoginModel
} from '../../../models/hutblogin.js'
let loginModel = new LoginModel()
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid_focus: false,
    passwd_focus: false,
    username: '',
  },
  inputFocus: function (e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': true
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': true
      });
    }
  }, 
  inputBlur: function (e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': false
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': false
      });
    }
  },
  useridInput: function (e) {
    this.setData({
      username: e.detail.value
    });
    if (e.detail.value.length >= 9) {
      wx.hideKeyboard();
    }
  },
  next: function () {
    var _this = this;
    if (!_this.data.username) {
      app.showTips('信息不完全', '请输入学号')
    } else{
      loginModel.getUsername(_this.data.username, (res)=>{
        console.log(res);
        if(!res.status) {
          app.showTips('提示', res.msg)
        } else {
          app.showTips('成功', '已获取密保', `/pages/user/mibao/mibao?cookie=${res.cookie}&id=${res.list.username}&pwdQuestion1=${res.list.pwdQuestion1}&pwdQuestion2=${res.list.pwdQuestion2}`)
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})