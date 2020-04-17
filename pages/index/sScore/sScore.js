// pages/index/score/sScore.js
var util = require('../../../utils/util.js');
import {
  HutbIndexModel
} from '../../../models/hutbindex.js'
let indexModel = new HutbIndexModel()
const app = getApp()

const buttons = [{
  openType: 'share',
  label: '分享成绩',
  icon: '/images/index/share.png',
}, {
  label: '查看全部成绩',
    icon:'/images/index/scores.png',
}, ]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    remind: '加载中',
    sScores: [],
    user: [],
    termdata: [],
    time: '',
 
    types: ['topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'center'],
    typeIndex: 3,
    colors: ['light', 'stable', 'positive', 'calm', 'balanced', 'energized', 'assertive', 'royal', 'dark'],
    colorIndex: 4,
    dirs: ['horizontal', 'vertical', 'circle'],
    dirIndex: 1,
    sAngle: 0,
    eAngle: 360,
    spaceBetween: 10,
    buttons,
  },
  onClick(e) {
    console.log('onClick', e.detail)
    if (e.detail.index === 1) {
      wx.navigateTo({
        url: '/pages/index/sScore/score',
      })
    }
  },
  onChange(e) {
    console.log('onChange', e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var termdata = wx.getStorageSync('termdata'),
      _this = this,
      now = new Date()
    var time = util.formatTime(new Date())
    indexModel.getScore(app._token.token, termdata.term, (res) => {
      if (res.status && res.data.length != 0) {
        _this.setData({
          remind: '',
          user: app._user.user,
          termdata: termdata,
          sScores: res.data,
          time: time
        })
        var isTrue = wx.getStorageSync('terms') || []
        if (isTrue.length === 0)
          // 获取全部成绩
          var isflag = app.getScores()
      } else if (res.data.length === 0) {
        _this.setData({
          remind: '当前学期查询无结果，可点击右下角➕查看全部成绩'
        })
      } else {
        _this.setData({
          remind: '查询失败，请稍后再试'
        })
      }
    })
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