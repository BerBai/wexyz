// pages/index/freeRoom/detial.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remind: '加载中',
    freeroom: [],
    info: [],
    roomlength: 0,
    scrollTop: 0,
    xq:["","星期一","星期二","星期三","星期四","星期五","星期六","星期天"]
  },
  onPageScroll(e) {
    console.log('onPageScroll', e.scrollTop)
    this.setData({
      scrollTop: e.scrollTop,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var classroom = wx.getStorageSync('freeroom'),
      _this = this

    _this.setData({
      'remind': '',
      'roomlength':classroom.total,
      'freeroom': classroom.list,
      'info': classroom.info,
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