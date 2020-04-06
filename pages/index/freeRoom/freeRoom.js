import {
  $wuxSelect
} from '../../../components/index'

import {
  HutbIndexModel
} from '../../../models/hutbindex.js'

let indexModel = new HutbIndexModel();
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
    termtime: [],
    idleZcT: '第一周',
    idleZc: 1,
    zc: [{
        value: '1',
        label: '第一周',
      }, {
        value: '2',
        label: '第二周',
      }, {
        label: '第三周',
        value: 3,
      }, {
        label: '第四周',
        value: 4,
      }, {
        label: '第五周',
        value: 5,
      }, {
        label: '第六周',
        value: 6,
      }, {
        label: '第七周',
        value: 7,
      }, {
        label: '第八周',
        value: 8,
      }, {
        label: '第九周',
        value: 9,
      }, {
        label: '第十周',
        value: 10,
      }, {
        label: '第十一周',
        value: 11,
      }, {
        label: '第十二周',
        value: 12,
      }, {
        label: '第十三周',
        value: 13,
      }, {
        label: '第十四周',
        value: 14,
      }, {
        label: '第十五周',
        value: 15,
      }, {
        label: '第十六周',
        value: 16,
      }, {
        label: '第十七周',
        value: 17,
      }, {
        label: '第十八周',
        value: 18,
      }, {
        label: '第十九周',
        value: 19,
      }, {
        label: '第二十周',
        value: 20,
      }
      // , {
      //   label: '第二十一周',
      //   value: 21,
      // }, {
      //   label: '第二十二周',
      //   value: 22,
      // }, {
      //   label: '第二十三周',
      //   value: 23,
      // }, {
      //   label: '第二十四周',
      //   value: 24,
      // }, {
      //   label: '第二十五周',
      //   value: 25,
      // }, {
      //   label: '第二十六周',
      //   value: 26,
      // }, {
      //   label: '第二十七周',
      //   value: 27,
      // }, {
      //   label: '第二十八周',
      //   value: 28,
      // }, {
      //   label: '第二十九周',
      //   value: 29,
      // }, {
      //   label: '第三十周',
      //   value: 30,
      // }
    ],
    idleJcT: '上午',
    idleJc: '01-04',
    jc: [{
      label: '上午',
      value: '01-04',
    }, {
      label: '下午',
      value: '05-08',
    }, {
      label: '晚上',
      value: '09-12',
    }, {
      label: '全天',
      value: '01-12',
    }],
    rooms: [],
    toweek: '',
    scrollTop: 0,
    isShow: false,
    isLoad: false // 提交状态
  },
  onPageScroll(e) {
    console.log('onPageScroll', e.scrollTop)
    this.setData({
      scrollTop: e.scrollTop,
    })
  },
  // 校区/教学楼选择
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
  // 周次选择
  onOpenZc() {
    this.setData({
      visible2: true
    })
  },
  onCloseZc() {
    this.setData({
      visible2: false
    })
  },
  onChangeZc(e) {
    var idleZcT = e.detail.options[0].label,
      idleZc = e.detail.options[0].value
    console.log(e)
    this.setData({
      idleZcT: idleZcT,
      idleZc: idleZc
    })
  },
  // 节次选择
  onOpenJc() {
    this.setData({
      visible3: true
    })
  },
  onCloseJc() {
    this.setData({
      visible3: false
    })
  },
  onChangeJc(e) {
    var idleJcT = e.detail.options[0].label,
      idleJc = e.detail.options[0].value
    console.log(e)
    this.setData({
      idleJcT: idleJcT,
      idleJc: idleJc
    })
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
  // 提交
  onClick: function() {
    var _this = this
    _this.setData({
      isLoad: true
    })
    //token, xnxqh, xqid, jzwid, zc1, zc2, jc1, jc2
    var jc = _this.data.idleJc.split('-')
    var xnxqh = _this.data.termtime.term,
      xqid = _this.data.xqid,
      jzwid = _this.data.jxlid,
      zc1 = _this.data.idleZc,
      zc2 = _this.data.idleZc,
      jc1 = jc[0],
      jc2 = jc[1],
      token = wx.getStorageSync('token').token || ''

    console.log(xnxqh, token, xqid, jzwid, zc1, zc2, jc1, jc2)
    if (xqid && jzwid && zc1 && zc2 && jc1 && jc2) {
      indexModel.getFreeClassroom(token, xnxqh, xqid, jzwid, zc1, zc2, jc1, jc2, (res) => {
        console.log(res)
        // if (res.success)
        _this.setData({
          rooms: res,
          isLoad: false,
          isShow: true
        })
        wx.navigateTo({
          url: './detial',
        })
      })

    } else {
      app.showTips("提示", "请检查选项填写")
      _this.setData({
        isLoad: false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this,
      now = new Date(),
      termdata = wx.getStorageSync('termdata');
    var day = now.getDate() > 9 ? now.getDate() : '0' + now.getDate()
    var time = now.getFullYear() + '-' + 0 + (now.getMonth() + 1) + '-' + day
    _this.setData({
      time: time,
      termtime: termdata,
      year: now.getFullYear(),
      idleZc: termdata.toweek,
      toweek: _this.data.zc[termdata.toweek - 1].label,
      idleZcT: _this.data.zc[termdata.toweek - 1].label
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