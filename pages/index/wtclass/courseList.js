// pages/index/wtclass/courseList.js
import {
  HutbIndexModel
} from '../../../models/hutbindex.js'
let hutbIndexModel = new HutbIndexModel();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courses: [],
    kkyxid: '',
    courseInfo: [],
    xq:[],
    jc:[],
    scrollTop: 0,
    isLoad: '加载中' // 提交状态
  },

  onCourse(e) {
    console.log("e", e)
    var _this = this
    var term = wx.getStorageSync('termdata').term || false,
      course = e.currentTarget.dataset.name,
      token = wx.getStorageSync('token').token || false
    if (term && token) {
      hutbIndexModel.getAuditing(token, term, course, (res) => {
        console.log(res);
        if (res.status) {
          _this.setData({
            'courseInfo': res.list,
            'xq': res.xq,
            'jc':res.jc,
            'isLoad': '详细'
          })
        } else {
          _this.setData({
            'isLoad': res.msg
          })
        }

      })
    }
  },
  onPageScroll(e) {
    console.log('onPageScroll', e.scrollTop)
    this.setData({
      scrollTop: e.scrollTop,
    })
  },
  //返回
  back(){
    var _this = this
    _this.setData({
      'isLoad':''
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    var _this = this

    if (options.length == 0) {
      _this.setData({
        'isLoad': '当前学期该院系未开课'
      })
    } else {
      _this.setData({
        'courses': app.auditing,
        'kkyxid': options.kkyxid,
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