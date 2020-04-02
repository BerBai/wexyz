// pages/index/timetable/timetable.js
import {
  LoginModel
} from '../../../models/hutblogin.js'
let loginModel = new LoginModel()
//获取应用实例
var app = getApp();
var util = require('../../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    remind: '加载中',
    color_box: {},
    termdata: '',
    _days: ['一', '二', '三', '四', '五', '六', '日'],
    _weeks: ['第一周', '第二周', '第三周', '第四周', '第五周', '第六周', '第七周', '第八周', '第九周', '第十周', '十一周', '十二周', '十三周', '十四周', '十五周', '十六周', '十七周', '十八周', '十九周', '二十周'],
    _time: [ //课程时间与指针位置的映射，{begin:课程开始,end:结束时间,top:指针距开始top格数}
      {
        begin: '0:00',
        end: '7:59',
        beginTop: -4,
        endTop: -4
      },
      {
        begin: '8:00',
        end: '9:40',
        beginTop: 0,
        endTop: 200
      },
      {
        begin: '9:41',
        end: '10:04',
        beginTop: 204,
        endTop: 204
      },
      {
        begin: '10:05',
        end: '11:45',
        beginTop: 208,
        endTop: 408
      },
      {
        begin: '11:46',
        end: '13:59',
        beginTop: 414,
        endTop: 414
      },
      {
        begin: '14:00',
        end: '15:40',
        beginTop: 420,
        endTop: 620
      },
      {
        begin: '15:41',
        end: '16:04',
        beginTop: 624,
        endTop: 624
      },
      {
        begin: '16:05',
        end: '17:45',
        beginTop: 628,
        endTop: 828
      },
      {
        begin: '17:46',
        end: '18:59',
        beginTop: 834,
        endTop: 834
      },
      {
        begin: '19:00',
        end: '20:40',
        beginTop: 840,
        endTop: 1040
      },
      {
        begin: '20:41',
        end: '20:49',
        beginTop: 1044,
        endTop: 1044
      },
      {
        begin: '20:50',
        end: '22:30',
        beginTop: 1048,
        endTop: 1248
      },
      {
        begin: '22:31',
        end: '23:59',
        beginTop: 1254,
        endTop: 1254
      },
    ],
    timelineTop: 0,
    scroll: {
      left: 0
    },
    targetLessons: [],
    targetX: 0, //target x轴top距离
    targetY: 0, //target y轴left距离
    targetDay: 0, //target day
    targetWid: 0, //target wid
    targetI: 0, //target 第几个active
    targetLen: 0, //target 课程长度
    activeClass: [], //课程名 教室
    blur: false,
    today: '', //当前星期数
    toweek: 1, //当前周数
    week: 1, //视图周数（'*'表示学期视图）
    lessons: [], //课程data
    dates: [], //本周日期
    is_vacation: false, // 是否为假期
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // wx.showLoading({
    //   title: 'loading',
    // })

    var token = wx.getStorageSync('token') || false,
      timetable = wx.getStorageSync('timetable'),
      _this = this,
      termdata = app.getCurrentTime() //时间
    // console.log('缓存获取term', termdata)
    // console.log('缓存获取token', token)
    // console.log('缓存获取timetable', timetable)
    //获取时间
    var date = new Date(),
      _this = this,
      week = termdata.toweek,
      //各周日期计算
      nowMonth = date.getMonth() + 1,
      nowDate = date.getDate(),
      today = (date.getDay() + 6) % 7; //0周一,1周二...6周日
    console.log('nowMonth', nowMonth)
    console.log('nowDate', nowDate)
    console.log('today', today)
    var dates = _this.data._weeks.slice(0); //0:第1周,1:第2周,..19:第20周

    dates = dates.map(function(e, m) {
      var idates = _this.data._days.slice(0); //0:周一,1:周二,..6:周日
      idates = idates.map(function(e, i) {
        var d = (m === (week - 1) && i === today) ? date : new Date(date.getFullYear(), date.getMonth(), date.getDate() - ((week - 1 - m) * 7 + (today - i)));
        return {
          month: d.getMonth() + 1,
          date: d.getDate()
        }
      });
      return idates;
    });
    const promise = new Promise((resolve, reject) => {
      //promise运行中有三个状态

      //pending 进行中
      //fulfilled 已成功
      //rejected 已失败

      //课表状态判断处理
      if (token && !timetable) {
        loginModel.getTimetable(token.token, '2017-2018-1', '', (timetable) => { //termdata.term, '', (timetable) => {
          _this.timetable = timetable
          console.log('1.获取的课表', timetable)
          resolve(timetable)
        })
      } else if (timetable) {
        console.log('从缓存中获取')
        resolve(timetable)
      } else {
        console.log('获取失败')
        resolve(timetable)
      }
    })
    promise.then(timetable => {
      console.log('2.查看次序', timetable)
      if (timetable.status) {
        _this.set_kb(timetable)
        console.log('刷新页面', timetable)
        this.setData({
          remind: false,
          today: today,
          termdata: termdata,
          dates: dates,
          toweek: termdata.toweek,
          week: termdata.toweek
        })
      }

      // console.log(openid)
      if (timetable.status) {


      } else {
        wx.hideToast();
        wx.showToast({
          title: timetable.msg,
          image: '/images/login/error.png',
          duration: 2000
        })
      }
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
    var _this = this;
    // 计算timeline时针位置
    function parseMinute(dateStr) {
      return dateStr.split(':')[0] * 60 + parseInt(dateStr.split(':')[1]);
    }

    function compareDate(dateStr1, dateStr2) {
      return parseMinute(dateStr1) <= parseMinute(dateStr2);
    }
    var nowTime = util.formatTime(new Date(), 'h:m');
    _this.data._time.forEach(function(e, i) {
      if (compareDate(e.begin, nowTime) && compareDate(nowTime, e.end)) {
        _this.setData({
          timelineTop: Math.round(e.beginTop + (e.endTop - e.beginTop) * (parseMinute(nowTime) - parseMinute(e.begin)) / 100)
        });
      };
    });
    //设置滚动至当前时间附近，如果周末为设置left为其最大值102
    var nowWeek = new Date().getDay();
    _this.setData({
      'scroll.left': ((nowWeek === 6 || nowWeek === 0) && !this.data.is_vacation) ? 102 : 0
    });
  },

  scrollXHandle: function(e) {
    // 鬼畜特效，为什么要加这个QAQ

    // this.setData({
    //   'scroll.left': e.detail.scrollLeft
    // });
  },
  showDetail: function(e) {
    // 点击课程卡片后执行
    var _this = this;
    var week = _this.data.week;
    var dataset = e.currentTarget.dataset;
    console.log('点击课程', dataset)

    var lessons = Array.from(_this.data.lessons[dataset.day][dataset.key]);
    var targetI = 0;
    console.log('课程具体', lessons)
    lessons[dataset.cid].target = true;

    lessons.map(function(e, i) {
      console.log('lessons.map(function(e,i)', e, i)
      if (lessons.length === 1) {
        e.left = 0;
      } else {
        //笼罩层卡片防止超出课表区域
        //周一~周四1~4:n lessons.length>=2*n+1时，设置left0为-n*128，否则设置为-60*(lessons.length-1)；
        //周日~周五7~5:n lessons.length>=2*(6-n)+1时，设置left0为-(7-n-lessons.length)*128，否则设置为-60*(lessons.length-1)；
        var left0 = -60 * (lessons.length - 1);
        if (dataset.day <= 4 && lessons.length >= 2 * dataset.day + 1) {
          left0 = -dataset.day * 128;
        } else if (dataset.day >= 5 && lessons.length >= 2 * (6 - dataset.day) + 1) {
          left0 = -(7 - dataset.day - lessons.length) * 128;
        }
        e.left = left0 + 128 * i;
      }
      return e;
    });
    lessons.forEach(function(e, i) {
      if (e.target) {
        targetI = i;
        lessons[i].target = false;
      }
    });
    if (lessons.length == 0) {
      return false;
    }
    _this.setData({
      targetX: dataset.day * 129 + 35 + 8,
      targetY: dataset.wid * 206 + Math.floor(dataset.wid / 2) * 4 + 60 + 8,
      targetDay: dataset.day,
      targetWid: dataset.key,
      targetI: targetI,
      targetLessons: lessons,
      targetLen: lessons.length,
      blur: true
    });
  },
  hideDetail: function() {
    // 点击遮罩层时触发，取消主体部分的模糊，清空target
    this.setData({
      blur: false,
      targetLessons: [],
      targetX: 0,
      targetY: 0,
      targetDay: 0,
      targetWid: 0,
      targetI: 0,
      targetLen: 0
    });

  },
  infoCardTap: function(e) {
    var dataset = e.currentTarget.dataset;
    if (this.data.targetI == dataset.index) {
      return false;
    }
    this.setData({
      targetI: dataset.index
    });
  },
  infoCardChange: function(e) {
    var current = e.detail.current;
    if (this.data.targetI == current) {
      return false;
    }
    this.setData({
      targetI: current
    });
  },
  chooseView: function() {
    var _this = this
    if (this.data.is_vacation === 'T') {

    } else {
      app.showLoadToast('切换视图中', 500);
      //切换视图(周/学期) *表示学期视图
      this.setData({
        week: _this.data.week == '*' ? this.data.toweek : '*',
      });
    }
  },
  returnCurrent: function() {
    //返回本周
    this.setData({
      week: this.data.toweek
    });
  },
  currentChange: function(e) {
    // 更改底部周数时触发，修改当前选择的周数
    var current = e.detail.current
    this.setData({
      week: current + 1
    });
  },
  catchMoveDetail: function() { /*阻止滑动穿透*/ },
  bindStartDetail: function(e) {
    this.setData({
      startPoint: [e.touches[0].pageX, e.touches[0].pageY]
    });
  },
  //滑动切换课程详情
  bindMoveDetail: function(e) {
    var _this = this;
    var curPoint = [e.changedTouches[0].pageX, e.changedTouches[0].pageY],
      startPoint = _this.data.startPoint,
      i = 0;
    if (curPoint[0] <= startPoint[0]) {
      if (Math.abs(curPoint[0] - startPoint[0]) >= Math.abs(curPoint[1] - startPoint[1])) {
        if (_this.data.targetI != _this.data.targetLen - 1) {
          i = 1; //左滑
        }
      }
    } else {
      if (Math.abs(curPoint[0] - startPoint[0]) >= Math.abs(curPoint[1] - startPoint[1])) {
        if (_this.data.targetI != 0) {
          i = -1; //右滑
        }
      }
    }
    if (!i) {
      return false;
    }
    _this.setData({
      targetI: parseInt(_this.data.targetI) + i
    });
  },
  //点击左右按钮切换swiper
  swiperChangeBtn: function(e) {
    var _this = this;
    var dataset = e.currentTarget.dataset,
      i, data = {};
    if (dataset.direction == 'left') {
      i = -1;
    } else if (dataset.direction == 'right') {
      i = 1;
    }
    data[dataset.target] = parseInt(_this.data[dataset.target]) + i;
    _this.setData(data);
  },

  set_kb: function(_data) {
    var _this = this

    function kbRender(_data, _this) {
      var i, ilen, j;
      var colors = ['#ff9ff3', '#0984e3', '#00b894', '#fdcb6e', '#e84393', '#00cec9', '#81ecec', '#6c5ce7', '#e17055', '#a29bfe', '#74b9ff', '#55efc4', '#009688', '#ffeaa7', '#4cb4e7', '#ffc09f', '#ffee93', '#efcee8', '#f3d7b5', '#daf9ca'];
      var color_box = {},
        color;
      var _lessons = _data;
      console.log('查看_lessons', _lessons.length)

      // var new_lessons = new Array();
      // for (i = 0; i < 7; i++) {
      //   new_lessons[i] = new Array()
      //   for (j = 0; j < 6; j++) {
      //     new_lessons[i][j] = []
      //   }
      // }
      // 调整课表
      console.log('调整课表')
      var cnt = 0;
      for (i = 1, ilen = 7; i <= ilen; i++) {
        for (j = 1; j <= 6; j++) {
          var s_time = _lessons[i][j].st
          var e_time = _lessons[i][j].et

          switch (_lessons[i][j].length) {
            case 0:
              break;
            case 1:
              if (!color_box.hasOwnProperty(_lessons[i][j][0].course)) {
                color_box[_lessons[i][j][0].course] = colors[cnt++ % 20]
              }
              break;
            case 2:
              if (!color_box.hasOwnProperty(_lessons[i][j][0].course)) {
                color_box[_lessons[i][j][0].course] = colors[cnt++ % 20]
              }
              if (!color_box.hasOwnProperty(_lessons[i][j][1].course)) {
                color_box[_lessons[i][j][1].course] = colors[cnt++ % 20]
              }
              break;
            case 3:
              if (!color_box.hasOwnProperty(_lessons[i][j][0].course)) {
                color_box[_lessons[i][j][0].course] = colors[cnt++ % 20]
              }
              if (!color_box.hasOwnProperty(_lessons[i][j][1].course)) {
                color_box[_lessons[i][j][1].course] = colors[cnt++ % 20]
              }
              if (!color_box.hasOwnProperty(_lessons[i][j][2].course)) {
                color_box[_lessons[i][j][1].course] = colors[cnt++ % 20]
              }
              break;
          }
        }
        // var day = parseInt(_lessons[i].kcsj.slice(0, 1))
        // var s_time = parseInt(_lessons[i].kcsj.slice(1, 3))
        // var e_time = parseInt(_lessons[i].kcsj.slice(3, 5))
        // console.log('开课时间',day, s_time, e_time)
        // new_lessons[day - 1][parseInt(s_time / 2)] = _lessons[i]
        // if (e_time - s_time > 1) // 连上三节课及以上
        //   new_lessons[day - 1][parseInt(s_time / 2) + 1] = _lessons[i]
        // // 配色
        // if (!color_box.hasOwnProperty(_lessons[i].kcmc)) {
        //   color_box[_lessons[i].kcmc] = colors[i % 7]
        // }
      }
      console.log(_lessons)
      _this.setData({
        lessons: _lessons,
        color_box: color_box
      })
    }
    kbRender(_data, _this)
    // wx.showNavigationBarLoading();
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

  },
  // 保存课表为图片
  eventDraw() {
    var that = this;
    if (that.data.shareImage != '') {
      wx.previewImage({
        urls: [that.data.shareImage],
      })
      wx.showToast({
        title: '图片已存至相册，可发给好友或设为壁纸',
        icon: 'none',
        duration: 3000
      })
      return
    }
    wx.showLoading({
      title: '绘制分享图片中',
      mask: true
    })
    const deviceInfo = wx.getSystemInfoSync();
    const screenWidth = deviceInfo.screenWidth;
    const screenHeight = deviceInfo.screenHeight;
    let topMargin = 10;
    if (screenHeight / screenWidth >= 1.8) {
      //检测是否为全面屏
      topMargin = 30;
    }
    var viewsArr = [{
      type: 'rect',
      background: '#fff',
      top: 0,
      left: 0,
      width: screenWidth,
      height: screenHeight
    }];
    //绘制星期
    const weekArr = ['周一', '周二', '周三', '周四', '周五'];
    for (let i = 0; i < weekArr.length; i++) {
      let rowTempArr = {
        type: 'text',
        content: weekArr[i],
        fontSize: 16,
        color: '#402D16',
        textAlign: 'left',
        top: topMargin,
        left: 30 + (i * ((screenWidth - 30) / weekArr.length)),
        bolder: true
      };
      viewsArr.push(rowTempArr);
    }
    //绘制节数
    for (let i = 1; i <= 12; i++) {
      let columnTempArr = {
        type: 'text',
        content: i,
        fontSize: 16,
        color: '#402D16',
        textAlign: 'center',
        top: (topMargin - 30) + (i * ((screenHeight - 30) / 12)),
        left: 10,
        bolder: true
      };
      viewsArr.push(columnTempArr);
    }

    const allCourseArr = that.data.classJson.course;
    let j = 0;
    for (let w in allCourseArr) {
      if (j < 5) {
        for (let i in allCourseArr[w]) {
          try {
            if (allCourseArr[w][i].courseName.length > 0) {
              let classTempBgArr = {
                type: 'rect',
                background: '#7acfa6',
                top: (topMargin + 30) + (2 * (i - 1) * ((screenHeight - 30) / 12)),
                left: Number(30 + (j * ((screenWidth - 30) / weekArr.length))),
                width: ((screenWidth - 30) / weekArr.length) - 1,
                height: (1 * ((screenHeight - 30) / 6)) - 1
              };
              viewsArr.push(classTempBgArr);
              let classTextTempArr = {
                type: 'text',
                content: allCourseArr[w][i].place + ' ' + allCourseArr[w][i].courseName,
                fontSize: 16,
                color: '#fff',
                textAlign: 'left',
                top: (topMargin + 30) + (2 * (i - 1) * ((screenHeight - 30) / 12) + 5),
                left: Number(30 + (j * ((screenWidth - 30) / weekArr.length)) + 5),
                breakWord: true,
                MaxLineNumber: 7,
                width: ((screenWidth - 30) / weekArr.length) - 20
              };
              viewsArr.push(classTextTempArr);
            }
          } catch (error) {
            let classTempBgArr = {
              type: 'rect',
              background: '#7acfa6',
              top: (topMargin + 30) + (2 * (i - 1) * ((screenHeight - 30) / 12)),
              left: Number(30 + (j * ((screenWidth - 30) / weekArr.length))),
              width: ((screenWidth - 30) / weekArr.length) - 1,
              height: (1 * ((screenHeight - 30) / 6)) - 1
            };
            viewsArr.push(classTempBgArr);
            let classTextTempArr = {
              type: 'text',
              content: allCourseArr[w][i][0].place + allCourseArr[w][i][0].courseName + ' ' + allCourseArr[w][i][1].place + allCourseArr[w][i][1].courseName,
              fontSize: 16,
              color: '#fff',
              textAlign: 'left',
              top: (topMargin + 30) + (2 * (i - 1) * ((screenHeight - 30) / 12) + 5),
              left: Number(30 + (j * ((screenWidth - 30) / weekArr.length)) + 5),
              breakWord: true,
              MaxLineNumber: 7,
              width: ((screenWidth - 30) / weekArr.length) - 20
            };
            viewsArr.push(classTextTempArr);
          }
        }
        j++;
      }
    }
    var canvasJson = {
      width: screenWidth,
      height: screenHeight,
      views: viewsArr
    };
    that.setData({
      painting: canvasJson
    })
  },
  eventGetImage(event) {
    var that = this;
    console.log(event)
    wx.hideLoading()
    const {
      tempFilePath,
      errMsg
    } = event.detail
    if (errMsg === 'canvasdrawer:ok') {
      this.setData({
        shareImage: tempFilePath
      })
      wx.previewImage({
        urls: [tempFilePath],
      })
      that.eventSave();
    }
  },
  eventSave() {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.shareImage,
      success(res) {
        wx.showToast({
          title: '图片已存至相册，可发给好友或设为壁纸',
          icon: 'none',
          duration: 3000
        })
      }
    })
  },
})