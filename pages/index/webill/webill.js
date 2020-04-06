// pages/index/webill/webill.js
var util = require('../../../utils/util.js');
import {
  HutbIndexModel
} from '../../../models/hutbindex.js'
let hutbIndexModel = new HutbIndexModel()
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: '',
    room: '',
    hassf: false,
    sf: '',
    hasdf: false,
    df: '',
    isLoad: '加载中'
  },

  //改房间
  changeRoom: function() {
    wx.redirectTo({
      url: './webind'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var time = util.formatTime(new Date(), ''),
      room = wx.getStorageSync('room') || false,
      _this = this
    if (!room) {
      wx.navigateTo({
        url: './webind',
      })
    } else {
      hutbIndexModel.getDf(room.id, (res) => {
        try {
          if (res.returnmsg == 'SUCCESS') {
            _this.setData({
              df: res,
              hasdf: true
            })
          } else {
            _this.setData({
              df: res,
              hasdf: false
            })
          }
        } catch (e) {
          _this.setData({
            hasdf: false
          })
        }

      })
      hutbIndexModel.getSf(room.id, (res) => {
        try {
          if (res.returnmsg == 'SUCCESS') {
            _this.setData({
              sf: res,
              hassf: true
            })
          } else {
            _this.setData({
              sf: res,
              hassf: false
            })
          }

        } catch (e) {
          _this.setData({
            hassf: false
          })
        }

      })
      _this.setData({
        'time': time,
        'room': room,
        'isLoad': ''
      })
    }

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
    var time = util.formatTime(new Date(), ''),
      room = wx.getStorageSync('room') || false,
      _this = this
    if (room ) {
      hutbIndexModel.getDf(room.id, (res) => {
        try {
          if (res.returnmsg == 'SUCCESS') {
            _this.setData({
              df: res,
              hasdf: true
            })
          } else {
            _this.setData({
              df: res,
              hasdf: false
            })
          }
        } catch (e) {
          _this.setData({
            hasdf: false
          })
        }

      })
      hutbIndexModel.getSf(room.id, (res) => {
        try {
          if (res.returnmsg == 'SUCCESS') {
            _this.setData({
              sf: res,
              hassf: true
            })
          } else {
            _this.setData({
              sf: res,
              hassf: false
            })
          }

        } catch (e) {
          _this.setData({
            hassf: false
          })
        }

      })
      _this.setData({
        'time': time,
        'room': room,
        'isLoad': ''
      })
    }
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