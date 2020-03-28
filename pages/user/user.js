// pages/user/user.js
var util = require('../../utils/util.js');
import {
  LoginModel
} from '../../models/login.js'
let loginModel = new LoginModel()
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {},
    stuInfo: {},
    token: {},
    userInfo: {},
    days: ['日', '一', '二', '三', '四', '五', '六'],
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    is_bind: false,
    nowtime:''
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
  getUserInfo: function(e) {
    var _this = this
    if (e.detail.userInfo) {
      wx.getUserInfo({
        withCredentials: true,
        success: function(res) {
          //获取缓存数据
          let wxuser = Array()
          wxuser = wx.getStorageSync('wxuser')
          let _wx = e.detail.userInfo

          //若没有 写入缓存
          if (!wxuser) {
            wxuser = _wx
            // console.log(wxuser)
            wx.setStorageSync('wxuser', wxuser)

            app._user['wx'] = _wx
          }

          wx.login({
            success: function(res) {
              console.log('success')
              console.log(res)
              if (res.code) {
                //发送请求
                loginModel.getOpenid(res.code, (opid) => {
                  // console.log(opid)
                })
              } else {
                console.log('登录失败！' + res.errMsg)
              }
            }
          })

          _this.setData({
            userInfo: app._user,
            user: _wx,
            hasUserInfo: true
          })
          console.log("getUserInfo success...")
          console.log(res)

          //测试输出userInfo
          console.log("userInfo" + userInfo)

        },
        fail: function(err) {
          console.log("getUserInfo fail...")

        }
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告通知',
        content: '您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。',
        success: (res) => {
          if (res.confirm) {
            wx.openSetting({
              success: (res) => {
                if (res.authSetting['scope.userInfo']) {
                  wx.getUserInfo({
                    success: function(res) {
                      // wx.setStorageSync("userInfo", res);
                      console.log(res)
                      wx.setStorageSync('wxuser', res.userInfo)
                      app._user['wx'] = res.userInfo
                      _this.setData({
                        userInfo: app._user,
                        user: res.userInfo,
                        hasUserInfo: true
                      })
                    },
                  })
                }
              }
            })
          }
        }
      });

    }

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getData();
    console.log(app)
  },
  getData: function() {
    var _this = this;
    var token = wx.getStorageSync('token'),
      stuInfo = wx.getStorageSync('stuInfo');
      console.log(stuInfo);
    if (token && stuInfo)
      // console.log("app._user")
      // console.log(app._user)
      _this.setData({
        'userInfo': app._user.user,
        'token': app._token,
        'time': app._time,
        'is_bind': token.success,
        'stuInfo': stuInfo
      });

      //测试输出
      console.log(_this.data.userInfo)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              console.log(res.userInfo)
            }
          })
        }
      }
    })

    //获取系统时间
    var time = util.formatTime(new Date()).trim().split(" "); //以空格截取分开字符串->新数组
    this.setData({
      nowtime: time[0]
    })
    //获取缓存数据
    let wxuser = wx.getStorageSync('wxuser')
    if (wxuser != '') {
      this.setData({
        user: wxuser,
        hasUserInfo: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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