// pages/index/wtclass/wtclass.js
import {
  $wuxSelect
} from '../../../components/index'

import {
  HutbIndexModel
} from '../../../models/hutbindex.js'
let hutbIndexModel = new HutbIndexModel();
//获取应用实例
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    kkyx: [{
      value: '00001',
      label: '经济与贸易学院',
    }, {
      value: '00002',
      label: '工商管理学院',
    }, {
      value: '00003',
      label: '数学与统计学院',
    }, {
      value: '00005',
      label: '会计学院',
    }, {
      value: '00013',
      label: '设计艺术学院',
    }, {
      value: '00006',
      label: '旅游管理学院',
    }, {
      value: '00007',
      label: '法学与公共管理学院',
    }, {
      value: '00008',
      label: '外国语学院',
    }, {
      value: '00009',
      label: '计算机与信息工程学院',
    }, {
      value: '00010',
      label: '文学与新闻传播学院',
    }, {
      value: '00017',
      label: '财政金融学院',
    }, {
      value: '00018',
      label: '创业教育与实践教学中心',
    }, {
      value: '00020',
      label: '马克思主义学院',
    }, {
      value: '00016',
      label: '国际商学院',
    }],
    kkyxid: '00001',
    term: '', //当前学年
    token: '',
    switchYx: false,
    isLoad: false // 提交状态
  },
  // 滚动选择
  onValueChange(e) {
    this.setData({
      kkyxid: e.detail.value
    })
    console.log('onValueChange', e.detail)
  },
  // 切换开关
  onSwitchYx({
    detail
  }) {
    this.setData({
      switchYx: detail
    });
  },
  next() {
    var _this = this
    if (_this.data.term && _this.data.kkyx) {
      if (!_this.data.switchYx) {
        hutbIndexModel.getCourseInfo(_this.data.token, _this.data.term, _this.data.kkyxid, '', (res) => {
          console.log(res)
          if (!res.status) {
            app.showTips('提示', res.msg)
          } else {
            app.auditing = res.list
            app.showTips('成功', '已获取到课程信息', `/pages/index/wtclass/courseList?&kkyxid=${res.kkyx}&length=${res.length}`)
          }
        })
      } else {
        hutbIndexModel.getCourseInfo(_this.data.token, _this.data.term, '', _this.data.kkyxid, (res) => {
          console.log(res)
          if (!res.status) {
            app.showTips('提示', res.msg)
          } else {
            app.auditing = res.list
            app.showTips('成功', '已获取到课程信息', `/pages/index/wtclass/courseList?&kkyxid=${res.kkyx}&length=${res.length}`)
          }
        })
      }

    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var term = wx.getStorageSync('termdata').term || false,
      token = wx.getStorageSync('token').token || false,
      _this = this
    _this.setData({
      'term': term,
      'token': token
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