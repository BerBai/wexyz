// pages/index/score/score.js
import {
  IndexModel
} from '../../../models/index.js'
let indexModel = new IndexModel()
// 获取app实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remind:'加载中',
    terms: [],
    user: [],
    scores: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(app)
    var _this = this,
      now = new Date()
    // 从缓存中获取
    var terms = wx.getStorageSync('terms') || []
    var term = wx.getStorageSync('termdata') || []
    term = term.xnxqh
    // 获取成绩
    var user = wx.getStorageSync('token') || [],
      token = wx.getStorageSync('token') || [],
      scores = [],
      nscore = [],
      i

    indexModel.getCjcx(token.id, token.token, term, (res) => {
      console.log(res)
      nscore = res
      if (res.token == -1) {
        wx.showToast({
          title: '请重新登录',
          icon: 'none',
          duration: 2000
        })
      }
    })
    for (i = 0; i < terms.length; i++) {
      scores[i] = wx.getStorageSync(terms[i])
      if (terms[i] === term) {
        var k = i
        terms[i] = nscore
        // indexModel.getCjcx(token.id, token.token, term, (res) => {
        //   console.log(res)
        //   scores[k] = res
        //   _this.setData({
        //     scores: scores
        //   })
        //   if (res.token == -1) {
        //     wx.showToast({
        //       title: '请重新登录',
        //       icon: 'none',
        //       duration: 2000
        //     })
        //   }
        // })
      }
    }

    _this.setData({
      terms: terms,
      scores: scores,
      year: now.getFullYear(),
      remind: ''
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