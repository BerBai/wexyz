Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLoading: '加载中',
    //存储存储各部门电话的数组
    telNumber: [{
      name: '联通客服',
      tel: 10010
    }, {
      name: '移动客服',
      tel: 10086
    }, {
      name: '团委',
      tel: 12345678
    }, {
      name: '网络中心',
      tel: 12345678
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this;
    setTimeout(function() {
      that.setData({
        isLoading: false
      });
    }, 400);

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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  /**
   * 点击拨出电话
   */
  callPhone: function(event) {
    wx.makePhoneCall({
      phoneNumber: event.target.id
    })
  },
  /**
   * 长按号码复制
   */
  copyIt: function(event) {
    wx.setClipboardData({
      data: event.target.id
    })
    wx.showToast({
      title: '已复制到粘贴版',
      icon: 'none',
      duration: 1000
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      // console.log(res.target)
    }
    return {
      title: '湖工大各系部联系电话',
      path: 'pages/tel/tel',
    }
  }
})