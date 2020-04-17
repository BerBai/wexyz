//导入js文件
var util = require('../../utils/util.js');
import {
  HutbIndexModel
} from '../../models/hutbindex.js'
import {
  LoginModel
} from '../../models/hutblogin.js'
import {
  IndexModel
} from '../../models/index.js'

//获取应用实例
const app = getApp()
let indexModel = new IndexModel()
let loginModel = new LoginModel()
let hutbIndexModel = new HutbIndexModel()
var util = require('../../utils/util.js');

Page({
  data: {
    imgUrls: [],
    nowtime: '',
    userTotal: '',
    cores: [
      [{
          //   id: 'timetable',
          //   name: '课表查询',
          //   disabled: false,
          //   teacher_disabled: false,
          //   offline_disabled: false
          // }, {
          // id: 'sScore',
          // name: '成绩查询',
          // disabled: false,
          // teacher_disabled: true,
          // offline_disabled: false
          // }, {
          //   id: 'freeRoom',
          //   name: '空教室',
          //   disabled: false,
          //   teacher_disabled: true,
          //   offline_disabled: false
          // }, {
          id: 'xcar',
          name: '校车时间',
          disabled: false,
          teacher_disabled: true,
          offline_disabled: false
        }, {
          id: 'time',
          name: '作息安排',
          disabled: false,
          teacher_disabled: true,
          offline_disabled: false
          // }, {
          //   id: 'calendar',
          //   name: '校历',
          //   disabled: false,
          //   teacher_disabled: true,
          //   offline_disabled: false
        }
        //  {
        //   id: 'exam',
        //   name: '考试安排',
        //   disabled: false,
        //   teacher_disabled: true,
        //   offline_disabled: false
        // }
      ],
      [{
          id: 'changePwd',
          name: '修改密码',
          disabled: false,
          teacher_disabled: true,
          offline_disabled: false
        },
        {
          id: 'pwd',
          name: '找回密码',
          disabled: false,
          teacher_disabled: true,
          offline_disabled: false
        }
      ]

    ],
    notices: {},
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: true,
    interval: 4000,
    duration: 1000,
    previousMargin: 0,
    nextMargin: 0,
    is_bind: false, //判断是否绑定

  },
  disabled_item: function() {
    wx.showToast({
      title: '请先绑定账号',
      icon: 'none',
      duration: 2000
    })
  },

  // 获取后台开启的功能-九宫格按键
  getFunc() {
    var _this = this
    indexModel.getFunc(1, 8, 1, (res) => {
      console.log('获取第一页九宫格', res)
      for (var i = 0; i < res['items'].length; i++) {
        _this.data.cores[0].push(res.items[i])
      }
      // 加载第二页
      if (res.total > 8) {
        indexModel.getFunc(2, 8, 1, (res2) => {
          console.log('获取第二页九宫格', res2)
          for (var i = 0; i < res2['items'].length; i++) {
            _this.data.cores[1].push(res2.items[i])
          }
          _this.setData({
            cores: _this.data.cores
          })
        })
      }

      console.log('', _this.data.cores)
      //页面更新
      _this.setData({
        cores: _this.data.cores
      })
    })
  },

  onLoad: function() {
    // console.log(app)
    var _this = this,
      i;
    _this.getFunc()
    // 调用函数时，传入new Date()参数，返回值是日期和时间    
    var time = util.formatTime(new Date(), '');
    var token = (wx.getStorageSync('token')) || ''
    if (token) {
      // 存在登录记录，再次登录更新token
      console.log('token缓存', token)
      const promise = new Promise((resolve, reject) => {
        loginModel.getCurrentTime('', (res) => {
          console.log('termdata', res)
        })
        loginModel.reLogin(token.encoded, (res) => {
          resolve(res)
        })
      })
      promise.then(res => {
        if (res.token === '-1') {
          console.log('token失效', res)
          // 重新手动登录
          loginModel.userGet(token.number, (res) => {
            console.log('res', res)
            loginModel.login(res.id, res.pwd, (info) => {
              if (!info.success) {
                wx.showModal({
                  title: '登录失败',
                  content: '需要重新绑定',
                  showCancel: false,
                  success(res) {
                    if (res.confirm) {
                      //跳转登录界面
                      wx.navigateTo({
                        url: '/pages/user/login/login'
                      })
                    }
                  }
                })
              } else {
                _this.init()
              }
            })
          })
        } else {
          console.log('token有效', res)
        }
      }, )
    }
    // 没登录直接跳转登录页面
    // else {
    //   wx.navigateTo({
    //     url: '/pages/user/login/login'
    //   })
    // }
    // 轮播图
    indexModel.getIndexImg((res) => {
      _this.setData({
        imgUrls: res
      })
    })
    // 通知
    indexModel.getNotice((res) => {
      app.notices = res.list
      // console.log(res)
      var new_notices = app.notices.slice(0, 2)
      // console.log(new_notices)
      for (i = 0; i < 2; i++) {
        new_notices[i].date = new_notices[i].creat_date.slice(0, 10)
      }
      _this.setData({
        notices: new_notices
      })
    })
    // 用户数
    indexModel.getTotal((res) => {
      _this.setData({
        userTotal: res,
        nowtime: time
      })
    })

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.init()
  },
  init() {
    var _this = this;
    var token = wx.getStorageSync('token')
    if (token) {
      var timetable = wx.getStorageSync('timetable') || [],
        terms = wx.getStorageSync('terms') || []

      //第一次获取课表

      // indexModel.getTimetable(token.id, token.token, (res) => {
      //   timetable = res
      //   console.log(timetable)
      // })


      // 获取当前学期
      app.getCurrentTime()
      // 刷新登录
      app.reLogin()
      // 第一次获取成绩
      // var isTrue = wx.getStorageSync(terms[0]) || []
      // console.log("istrue", isTrue)
      // if (isTrue.length === 0)
      app.getScores()
      
      _this.setData({
        is_bind: token.success
      })
    }
  },
  //分享
  onShareAppMessage: function() {
    return {
      title: 'WeXYZ',
      desc: '湖南工商大学的一站式平台',
      path: '/pages/index/index'
    };
  },
})