// pages/user/zan/zanlog.js
import {
  ZanlogModel
} from '../../../models/zanlog.js'

let zanlogModel = new ZanlogModel()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    loglist: [{
      name: '匿名',
      time: '2018年5月23日 21:18',
      money: '1.00'
    }, {
      name: '杨阳',
      time: '2018年7月19日 17:41',
      money: '1.00'
    }]
  },
  getlist() {
    var _this = this
    zanlogModel.getZanlist(1, 200, (res) => {
      console.log(res)
      _this.setData({
        loglist: res
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this
    _this.getlist();
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