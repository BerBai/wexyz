// pages/index/department/department.js
import {
  IndexModel
} from '../../../models/index.js'
let indexModel = new IndexModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    detail_status: false,
    it: [],
    high: 100
  },

  tapDetail: function(e) {
    if (e.target.id == 'help') {
      this.hideDetail();
    }
  },
  showDetail: function(e) {
    var _this = this;
    wx.getSystemInfo({
      success(res) {
        _this.setData({
          'high': res.windowHeight
        })
      }
    })
    console.log(e)
    this.setData({
      'detail_status': true,
      'it': _this.data.list[e.currentTarget.id]
    });
  },
  hideDetail: function(e) {
    this.setData({
      'detail_status': false
    });
  },
  getDepartment() {
    var _this = this;
    indexModel.getDepartment(1, 20, (res) => {
      console.log(res)
      _this.setData({
        list: res.items
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    _this.getDepartment();
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