Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLoading: true,
    isAble: 'summer',
    xcars: [],
    lists: {
      summer: [{
        name: '校本部一食堂——北校区',
        time: '7:30'
      }, {
        name: '校本部一食堂——北校区',
        time: '9:30'
      }, {
        name: '北校区——校本部一食堂',
        time: '12:00'
      }, {
        name: '校本部一食堂——北校区',
        time: '14:00'
      }, {
        name: '校本部一食堂——北校区',
        time: '15:45'
      }, {
        name: '北校区——校本部一食堂',
        time: '16:20'
      }, {
        name: '北校区——校本部一食堂',
        time: '18:00'
      }, {
        name: '校本部一食堂——北校区',
        time: '18:30'
      }, {
        name: '校本部一食堂——北校区',
        time: '21:40'
      }],
      winter: [{
        name: '校本部一食堂——北校区',
        time: '7:30'
      }, {
        name: '校本部一食堂——北校区',
        time: '9:30'
      }, {
        name: '北校区——校本部一食堂',
        time: '12:00'
      }, {
        name: '校本部一食堂——北校区',
        time: '13:30'
      }, {
        name: '校本部一食堂——北校区',
        time: '15:15'
      }, {
        name: '北校区——校本部一食堂',
        time: '15:50'
      }, {
        name: '北校区——校本部一食堂',
        time: '17:30'
      }, {
        name: '校本部一食堂——北校区',
        time: '18:30'
      }, {
        name: '校本部一食堂——北校区',
        time: '21:40'
      }]
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