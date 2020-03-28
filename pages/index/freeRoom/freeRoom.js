import {
  $wuxSelect
} from '../../../components/index'

import {
  IndexModel
} from '../../../models/index.js'
let indexModel = new IndexModel()
//获取应用实例
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    xq: '湖南商学院南院/一教',
    xqid: '00001',
    jxlid: '00001',
    xq_jxl: [{
        value: '00001',
        label: '湖南商学院南院',
        isLeaf: false,
        children: [{
          value: '00001',
          label: '一教',
        }, {
          value: '00002',
          label: '二教',
        }, {
          value: '00003',
          label: '三教',
        }, {
          value: 'E96115AF6A91457389BF84B147BF7547',
          label: '艺术教学楼'
        }, {
          value: 'E02A7BF55B124307B25ADCD932F59F53',
          label: '国教楼'
        }, {
          value: 'F3695D08059741B3B25DBF59A1C78623',
          label: '体育教学楼'
        }, {
          value: 'AD78BE941D4145508D829EC8EF70C04C',
          label: '实验楼'
        }]
      },
      {
        value: '00002',
        label: '湖南商学院北院',
        isLeaf: false,
        children: [{
          value: '332328065C2440CBAC97F4A714E8937F',
          label: '东马教学楼',
        }, {
          value: 'AF381364D2E3457EAC10E97A85BEB72E',
          label: '东马实验楼',
        }, {
          value: '008',
          label: '东马图书馆',
        }, {
          value: '001',
          label: '东马二食堂'
        }]
      }
    ],
    value1: [],
    time: '', //日期

    idleTimeT: '全天',
    idleTime: 'allday',
    rooms: [],
    scrollTop: 0,
    isShow: false,
    isLoad: false
  },
  onPageScroll(e) {
    console.log('onPageScroll', e.scrollTop)
    this.setData({
      scrollTop: e.scrollTop,
    })
  },

  onOpenXq() {
    this.setData({
      visible1: true
    })
  },
  onCloseXq() {
    this.setData({
      visible1: false
    })
  },
  onChangeXq(e) {
    var id = e.detail.options.map((n) => n.value).join('/'),
      jxlid, xqid
    id = id.split('/')
    xqid = id[0]
    jxlid = id[1] || ''
    console.log(xqid, jxlid)
    this.setData({
      xq: e.detail.options.map((n) => n.label).join('/'),
      xqid: xqid,
      jxlid: jxlid
    })
    console.log('onChangeXq', e.detail)
  },
  //获取时间
  openCalendar() {
    const now = new Date()
    const minDate = now.setDate(now.getDate() - 1)
    const maxDate = now.setDate(now.getDate() + 7)

    $wuxSelect('#wux-calendar').open({
      value: this.data.value1,
      minDate,
      // maxDate,
      onChange: (values, displayValues) => {
        console.log('onChange', values, displayValues)
        this.setData({
          time: displayValues,
        })
      },
    })
  },
  selTime: function() {
    $wuxSelect('#idleTimeT').open({
      value: this.data.idleTimeT,
      options: [{
        title: '全天',
        value: 'allday',
      }, {
        title: '上午',
        value: 'am',
      }, {
        title: '下午',
        value: 'pm',
      }, {
        title: '晚上',
        value: 'night',
      }],
      onConfirm: (value, index, options) => {
        console.log('onConfirm', value, index, options)
        if (index !== -1) {
          this.setData({
            idleTime: value,
            idleTimeT: options[index].title,
          })
        }
      },
    })
  },
  onClick: function() {
    var _this = this
    _this.setData({
      isLoad: true
    })
    var time = _this.data.time,
      xqid = _this.data.xqid,
      jxlid = _this.data.jxlid,
      idleTime = _this.data.idleTime,
      token = wx.getStorageSync('token').token || ''
    console.log(idleTime, token, time, xqid, jxlid)
    if (time && xqid && idleTime) {
      indexModel.getKxJscx(idleTime, token, time, xqid, jxlid, (res) => {
        console.log(res)
        // if (res.success)
        _this.setData({
          rooms: res,
          isLoad: false,
          isShow: true
        })
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this,
      now = new Date();
    var day = now.getDate() > 9 ? now.getDate() : '0' + now.getDate()
    var time = now.getFullYear() + '-' + 0 + (now.getMonth() + 1) + '-' + day
    _this.setData({
      time: time,
      year: now.getFullYear()
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