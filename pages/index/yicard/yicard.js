// pages/index/yicard/yicard.js
var util = require('../../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remind: '加载中',
    bills: [{
      time: '2019-10-29 07:21',
      type: '支出',
      money: '-8'
    }, {
      time: '2019-10-28 07:08',
      type: '支出',
      money: '-8'
    }, {
      time: '2019-10-27 14:36',
      type: '充值',
      money: '+10'
    }],
    name: '', //持卡人
    canvas_remind: '加载中',
    fontSize: 12, // 字体大小, 24rpx=12px
    count: 10, // 展示的消费次数
    width: 0, // 画布宽
    height: 300, // 画布高, wxss给定canvas高300px
    dict: [], // 所有消费数据
    points: [], // 点的集合（包括点的横坐标x、纵坐标y、当前点的详情detail）
    costArr: [], // 消费金额集合
    balanceArr: [], // 余额金额集合
    tapDetail: {}, // 每个点对应的详情集合
    lineLeft: 0, // 详情垂直线的初始左边距
    gridMarginLeft: 35, // 表格左边距
    gridMarginTop: 20, // 表格上边距
    balance: 0, // 当前余额（余额卡片上的展示数据）
    last_time: '',
    ykt_id: '',
    switchBtn: true, // true:余额 or false:交易额
    options: {},
    currentIndex: 0 // 当前点的索引，切换视图的时候保持当前详情
  },

  sendRequest: function() {
    var _this = this
    var time = util.formatTime(new Date(), 'm-d h:m'),
      name = wx.getStorageSync('stuInfo').data.xm || []
    _this.setData({
      'remind': '',
      'time': time,
      'name': name
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    wx.getSystemInfo({
      success: function(res) {
        // 获取窗口宽, 计算画布宽
        _this.setData({
          'width': res.windowWidth
        });
      }
    });
    _this.sendRequest();
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