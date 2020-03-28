// pages/user/mibao/mibao.js
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
    ans1_focus: '',
    ans2_focus: '',
    id: '',
    question1: '',
    question2: '',
    ans1: '',
    ans2: '',
    cookie: '',
  },
  inputFocus: function (e) {
   if (e.target.id == 'ans1') {
      this.setData({
        'ans1_focus': true
      });
    } else if (e.target.id == 'ans2') {
      this.setData({
        'ans2_focus': true
      });
    }
  },
  inputBlur: function (e) {
   if (e.target.id == 'ans1') {
      this.setData({
        'ans1_focus': false
      }); 
    } else if (e.target.id == 'ans2') {
      this.setData({
        'ans2_focus': false
      });
    }
  },
  ans1Input: function (e) {
    this.setData({
      ans1: e.detail.value
    });
    
  },
  ans2Input: function (e) {
    this.setData({
      ans2: e.detail.value
    });
    
  },
  next: function () {
    var _this = this;
    if (!_this.data.ans1 || !_this.data.ans2) {
      app.showTips('信息不完全', '请输入答案')
    } else {
      loginModel.getPwd(_this.data.id, _this.data.cookie, _this.data.question1, _this.data.ans1, _this.data.question2, _this.data.ans2, (res) => {
        console.log(res);
        if (!res.status) {
          app.showTips('提示', res.msg)
        } else {
          app.showTips('成功', res.msg, '', `/pages/user/user`)
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    console.log(option)
    var _this = this
    _this.setData({
      'id': option.id,
      'question1': option.pwdQuestion1,
      'question2': option.pwdQuestion2,
      'cookie': option.cookie,
    })
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