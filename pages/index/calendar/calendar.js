// pages/calendar/calendar.js
var util = require('../../../utils/util.js');
import {
  IndexModel
} from '../../../models/index.js'
let indexModel = new IndexModel()
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading: true,
    jsonContent: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 调用函数时，传入new Date()参数，返回值是日期和时间  
    var time = util.formatTime(new Date());
    var _this = this;
    var now = new Date()
    indexModel.getCalendar((res) => {
      console.log(res)
      _this.setData({
        jsonContent: res,
        year:now.getFullYear()
      })
      setTimeout(function() {
        _this.setData({
          isLoading: false
        });
      }, 800);

    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    return {
      title: '校历',
      path: 'pages/index/calendar/calendar',
    }
  },
  showPic: function() {
    wx.previewImage({
      current: 'https://xyz.125520.xyz/images/time/current.png', // 当前显示图片的http链接
      urls: ["https://xyz.125520.xyz/images/time/current.png"] // 需要预览的图片http链接列表
    })
  }
})