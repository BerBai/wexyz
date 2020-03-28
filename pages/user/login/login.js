// pages/user/login/login.js
import {
  LoginModel
} from '../../../models/hutblogin.js'

let loginModel = new LoginModel()
//获取应用实例
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    remind: '加载中',
    help_status: false,
    userid_focus: false,
    passwd_focus: false,
    userid: '',
    passwd: '',
    angle: 0,
    checked: false,
    agreement_status: false
  },

  onChange(event) {
    this.setData({
      checked: event.detail
    });
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
    var _this = this;
    setTimeout(function() {
      _this.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function(res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) {
        angle = 14;
      } else if (angle < -14) {
        angle = -14;
      }
      if (_this.data.angle !== angle) {
        _this.setData({
          angle: angle
        });
      }
    });
  },

  showTips(title, content, pages = '') {
    wx.showModal({
      title: title,
      content: content,
      showCancel: false,
      success(e) {
        if (pages) {
          // 返回
          wx.switchTab({
            url: pages
          })
        }
      }
    })
  },

  bind: function() {
    var _this = this;
    if(!_this.data.userid || !_this.data.passwd){
      _this.showTips('信息不完全', '请输入账号和密码')
    } else if (!_this.data.checked) {
    // 未同意则提示
      wx.showToast({
        title: '登录请同意《用户协议和隐私条款》',
        icon: 'none',
        duration: 2000
      })

    } else { 
      // 登录
      loginModel.login(_this.data.userid, _this.data.passwd, (res) => {
        var openid = {}
        const promise = new Promise((resolve, reject) => {
          //promise运行中有三个状态

          //pending 进行中
          //fulfilled 已成功
          //rejected 已失败
          wx.login({
            success: function(res) {
              if (res.code) {
                //发送请求
                loginModel.getOpenid(res.code, (opid) => {
                  // console.log(opid)
                  _this.opid = opid
                  resolve(opid)
                })
              } else {
                console.log('登录失败！' + res.errMsg)
              }
            }
          })
        })
        promise.then(opid => {
          openid = wx.getStorageSync('openid')
          // console.log(openid)
          if (res.success) {
            app._token = res
            wx.showLoading({
              title: '加载中',
            })
            setTimeout(function() {
              wx.hideLoading()
            }, 1000)
            loginModel.getUserInfo(res.token, (info) => {
              app.stuInfo = info
              app._user['user'] = info.data
              console.log('res')
              console.log(res)
              loginModel.userInsert_update(_this.data.userid, res.name, _this.data.passwd, res.token, openid.openid, '', '', '2', (res) => {
                console.log('user,有id号则插入成功', res)
              })
            })

            loginModel.getCurrentTime(res.token, (currentTime) => {
              console.log('currentTime', currentTime)
              var date = new Date();
              currentTime['date'] = date.getDay()

              app._time = currentTime

              // 返回
              wx.switchTab({
                url: '/pages/user/user'
              })
            })

          } else {
            wx.hideToast();
            wx.showToast({
              title: res.msg,
              image: '/images/login/error.png',
              duration: 2000
            })
          }
        })
      })
    }
  },
  useridInput: function(e) {
    this.setData({
      userid: e.detail.value
    });
    //输入9位后失去焦点
    if (e.detail.value.length >= 9) {
      wx.hideKeyboard();
    }
  },
  passwdInput: function(e) {
    this.setData({
      passwd: e.detail.value
    });
  },
  inputFocus: function(e) {
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
  inputBlur: function(e) {
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
  tapHelp: function(e) {
    if (e.target.id == 'help') {
      this.hideHelp();
    }
  },
  showHelp: function(e) {
    this.setData({
      'help_status': true
    });
  },
  hideHelp: function(e) {
    this.setData({
      'help_status': false
    });
  },
  // tapAgreement: function (e) {
  //   console.log(e)
  //   if (e.target.id == 'agreement') {
  //     this.hideAgreement();
  //   }
  // },
  showAgreement: function(e) {
    wx.navigateTo({
      url: "/pages/user/agreement/agreement",
    })
  },
  onclickPwd: function (e) {
    wx.navigateTo({
      url: "/pages/index/pwd/pwd",
    })
  },
  onclickChangePwd: function (e) {
    wx.navigateTo({
      url: "/pages/index/changePwd/changePwd",
    })
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