// pages/user/feedback/feedback.js
import {
  MailModel
} from '../../../models/mail.js'

let mailModel = new MailModel()
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list_remind: '加载中',
    title: '',
    content: '',
    mail: '',
    name: '',
    systemInfo: '',
    qiniu: '',
    showError: false
  },

  listenerTitle: function(e) {
    this.setData({
      'title': e.detail.value
    });
  },
  listenerMail: function(e) {
    this.setData({
      'mail': e.detail.value
    });
  },
  listenerName: function(e) {
    this.setData({
      'name': e.detail.value
    });
  },
  listenerTextarea: function(e) {
    this.setData({
      'content': e.detail.value
    });
  },
  copyText: function (e) {
    console.log(e)
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '内容复制成功'
            })
          }
        })
      }
    })
  },
  showTips: function(msgT, msgC, back = false) {
    wx.showModal({
      title: msgT,
      content: msgC,
      showCancel: false,
      success: function(res) {
        if (back)
          wx.navigateBack();
      }
    })
  },

  submit: function() {
    var _this = this,
      title = '',
      content = '',
      mail = '',
      imgs = '';
    if (!_this.data.title || !_this.data.name || !_this.data.content) {
      _this.showTips('填写不完全', '标题、姓名或学号及内容为必填项')
    } else {
      wx.showModal({
        title: '提示',
        content: '是否确认提交反馈？',
        success: function(res) {
          if (res.confirm) {
            if (app._user.wx)
              title = '【' + app._user.wx.nickName + '】' + _this.data.title;
            content = _this.data.content + _this.data.systemInfo;
            mail = _this.data.mail
            wx.showLoading({
              title: '正在提交',
            })
            mailModel.feedback(content, title, mail, (res) => {
              console.log(res)
              if (res === true) {
                var text = '反馈成功，您也可以加入WeXYZ用户反馈QQ群555917997进行即时反馈了解反馈动态';
                _this.showTips('反馈成功', text, true)
                wx.hideLoading();
              } else {
                _this.showTips('提交失败', '提交失败，您可以稍后再试，也可以加入WeXYZ用户反馈QQ群555917997进行即时反馈了解反馈动态');
                wx.hideLoading();
              }
            })
          }
        },
      });
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    wx.getSystemInfo({
      success: function(res) {
        var systemInfo = '<br>---<br>**用户信息**';
        systemInfo += '<br>用户名：' + app._user.wx.nickName;
        systemInfo += '<br>手机型号：' + res.model;
        systemInfo += '（' + res.platform + ' - ' + res.windowWidth + 'x' + res.windowHeight + '）';
        systemInfo += '<br>微信版本号：' + res.version;
        systemInfo += '<br>WeXYZ版本号：' + app.version;
        _this.setData({
          systemInfo: systemInfo
        });
      }
    });
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