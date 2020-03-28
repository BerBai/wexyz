Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLoading: true,
    isAble: 'summer',
    //存储数据的数组
    times: [],
    lists: {
      summer: [{
        name: '第一节课',
        time: '08:00-08:45'
      }, {
        name: '第二节课',
        time: '08:55-09:40'
      }, {
        name: '第三节课',
        time: '10:05-10:50'
      }, {
        name: '第四节课',
        time: '11:00-11:45'
      }, {
        name: '第五节课',
        time: '14:30-15:15'
      }, {
        name: '第六节课',
        time: '15:20-16:05'
      }, {
        name: '第七节课',
        time: '16:20-17:05'
      }, {
        name: '第八节课',
        time: '17:10-17:55'
      }, {
        name: '第九节课',
        time: '19:00-19:45'
      }, {
        name: '第十节课',
        time: '19:50-20:35'
      }, ],
      winter: [{
        name: '第一节课',
        time: '08:00-08:45'
      }, {
        name: '第二节课',
        time: '08:55-09:40'
      }, {
        name: '第三节课',
        time: '10:05-10:50'
      }, {
        name: '第四节课',
        time: '11:00-11:45'
      }, {
        name: '第五节课',
        time: '14:00-15:45'
      }, {
        name: '第六节课',
        time: '14:50-15:35'
      }, {
        name: '第七节课',
        time: '15:50-16:35'
      }, {
        name: '第八节课',
        time: '16:40-17:25'
      }, {
        name: '第九节课',
        time: '19:00-19:45'
      }, {
        name: '第十节课',
        time: '19:50-20:35'
      }, ]
    }
  },

  onSwitch: function(e) {
    console.log(e)
    var _this = this
    _this.setData({
      xcars: _this.data.lists[e.target.id],
      isAble: e.target.id
    })
    wx.showToast({
      title: '已切换为' + e._relatedInfo.anchorTargetText + '时间',
      icon: "none",
      duration: 2000
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this,
      now = new Date()
    _this.setData({
      year: now.getFullYear()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this;
    setTimeout(function() {
      that.setData({
        xcars: that.data.lists['summer'],
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
   * 点击电话号码拨出电话事件的处理函数
   */
  callPhone: function(event) {
    wx.makePhoneCall({
      phoneNumber: event.target.id
    })
  },
  /**
   * 长按号码复制到粘贴板的处理函数
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
      title: '校车时间',
      path: "pages/index/xcar/xcar"
    }
  }
})