// pages/index/webill/webind.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xqid: '',
    gyid: '',
    lcid: '',
    fjid: '',
    room: {
      fj: "",
      gy: '',
      id:'',
      lc:''
    },
    xq: [{
      'id': '2',
      'open': false,
      'name': '南校区',
      'gy': [{
          "id": "20",
          "name": "国际教育学院",
          "open": false,
          'lc': [{
              "id": "37",
              "name": "1层",
              "open": false
            },
            {
              "id": "38",
              "name": "2层",
              "open": false
            },
            {
              "id": "39",
              "name": "3层",
              "open": false
            },
            {
              "id": "40",
              "name": "4层",
              "open": false
            },
            {
              "id": "41",
              "name": "5层",
              "open": false
            },
            {
              "id": "42",
              "name": "6层",
              "open": false
            },
            {
              "id": "43",
              "name": "7层",
              "open": false
            }
          ]
        },
        {
          "id": "29",
          "name": "继教学院",
          "open": false,
          'lc': [{
              "id": "224",
              "name": "2层",
              "open": false
            },
            {
              "id": "225",
              "name": "3层",
              "open": false
            },
            {
              "id": "226",
              "name": "4层",
              "open": false
            }
          ]
        },
        {
          "id": "18",
          "name": "岭南公寓",
          "open": false,
          'lc': [{
              "id": "44",
              "name": "1层",
              "open": false
            },
            {
              "id": "45",
              "name": "2层",
              "open": false
            },
            {
              "id": "46",
              "name": "3层",
              "open": false
            },
            {
              "id": "47",
              "name": "4层",
              "open": false
            },
            {
              "id": "48",
              "name": "5层",
              "open": false
            },
            {
              "id": "49",
              "name": "6层",
              "open": false
            },
            {
              "id": "50",
              "name": "7层",
              "open": false
            }
          ]
        },
        {
          "id": "14",
          "name": "咸嘉2栋",
          "open": false,
          'lc': [{
              "id": "100",
              "name": "1层",
              "open": false
            },
            {
              "id": "101",
              "name": "2层",
              "open": false
            },
            {
              "id": "102",
              "name": "3层",
              "open": false
            },
            {
              "id": "103",
              "name": "4层",
              "open": false
            },
            {
              "id": "104",
              "name": "5层",
              "open": false
            },
            {
              "id": "105",
              "name": "6层",
              "open": false
            }
          ]
        },
        {
          "id": "15",
          "name": "咸嘉3栋",
          "open": false,
          'lc': [{
              "id": "106",
              "name": "1层",
              "open": false
            },
            {
              "id": "107",
              "name": "2层",
              "open": false
            },
            {
              "id": "108",
              "name": "3层",
              "open": false
            },
            {
              "id": "109",
              "name": "4层",
              "open": false
            },
            {
              "id": "110",
              "name": "5层",
              "open": false
            },
            {
              "id": "111",
              "name": "6层",
              "open": false
            }
          ]
        },
        {
          "id": "16",
          "name": "咸嘉4栋",
          "open": false,
          'lc': [
            [{
                "id": "112",
                "name": "1层",
                "open": false
              },
              {
                "id": "113",
                "name": "2层",
                "open": false
              },
              {
                "id": "114",
                "name": "3层",
                "open": false
              },
              {
                "id": "115",
                "name": "4层",
                "open": false
              },
              {
                "id": "116",
                "name": "5层",
                "open": false
              },
              {
                "id": "117",
                "name": "6层",
                "open": false
              }
            ]
          ]
        },
        {
          "id": "17",
          "name": "咸嘉5栋",
          "open": false,
          'lc': [{
              "id": "118",
              "name": "1层",
              "open": false
            },
            {
              "id": "119",
              "name": "2层",
              "open": false
            },
            {
              "id": "120",
              "name": "3层",
              "open": false
            },
            {
              "id": "121",
              "name": "4层",
              "open": false
            },
            {
              "id": "122",
              "name": "5层",
              "open": false
            },
            {
              "id": "123",
              "name": "6层",
              "open": false
            }
          ]
        },
        {
          "id": "10",
          "name": "贤德10栋",
          "open": false,
          'lc': [{
              "id": "57",
              "name": "1层",
              "open": false
            },
            {
              "id": "58",
              "name": "2层",
              "open": false
            },
            {
              "id": "59",
              "name": "3层",
              "open": false
            },
            {
              "id": "60",
              "name": "4层",
              "open": false
            },
            {
              "id": "61",
              "name": "5层",
              "open": false
            },
            {
              "id": "62",
              "name": "6层",
              "open": false
            }
          ]
        },
        {
          "id": "11",
          "name": "贤德11栋",
          "open": false,
          'lc': [{
              "id": "63",
              "name": "1层",
              "open": false
            },
            {
              "id": "64",
              "name": "2层",
              "open": false
            },
            {
              "id": "65",
              "name": "3层",
              "open": false
            },
            {
              "id": "66",
              "name": "4层",
              "open": false
            },
            {
              "id": "67",
              "name": "5层",
              "open": false
            },
            {
              "id": "68",
              "name": "6层",
              "open": false
            }
          ]
        },
        {
          "id": "12",
          "name": "贤德12栋",
          "open": false,
          'lc': [{
              "id": "69",
              "name": "1层",
              "open": false
            },
            {
              "id": "70",
              "name": "2层",
              "open": false
            },
            {
              "id": "71",
              "name": "3层",
              "open": false
            },
            {
              "id": "72",
              "name": "4层",
              "open": false
            },
            {
              "id": "73",
              "name": "5层",
              "open": false
            },
            {
              "id": "74",
              "name": "6层",
              "open": false
            }
          ]
        },
        {
          "id": "13",
          "name": "贤德14栋",
          "open": false,
          'lc': [{
              "id": "95",
              "name": "1层",
              "open": false
            },
            {
              "id": "96",
              "name": "2层",
              "open": false
            },
            {
              "id": "97",
              "name": "3层",
              "open": false
            },
            {
              "id": "98",
              "name": "4层",
              "open": false
            },
            {
              "id": "99",
              "name": "5层",
              "open": false
            }
          ]
        },
        {
          "id": "7",
          "name": "贤德7栋",
          "open": false,
          'lc': [{
              "id": "75",
              "name": "1层",
              "open": false
            },
            {
              "id": "76",
              "name": "2层",
              "open": false
            },
            {
              "id": "77",
              "name": "3层",
              "open": false
            },
            {
              "id": "78",
              "name": "4层",
              "open": false
            },
            {
              "id": "79",
              "name": "5层",
              "open": false
            },
            {
              "id": "80",
              "name": "6层",
              "open": false
            },
            {
              "id": "81",
              "name": "7层",
              "open": false
            }
          ]
        },
        {
          "id": "8",
          "name": "贤德8栋",
          "open": false,
          'lc': [{
              "id": "82",
              "name": "1层",
              "open": false
            },
            {
              "id": "83",
              "name": "2层",
              "open": false
            },
            {
              "id": "84",
              "name": "3层",
              "open": false
            },
            {
              "id": "85",
              "name": "4层",
              "open": false
            },
            {
              "id": "86",
              "name": "5层",
              "open": false
            },
            {
              "id": "87",
              "name": "6层",
              "open": false
            },
            {
              "id": "88",
              "name": "7层",
              "open": false
            }
          ]
        },
        {
          "id": "9",
          "name": "贤德9栋",
          "open": false,
          'lc': [{
              "id": "89",
              "name": "1层",
              "open": false
            },
            {
              "id": "90",
              "name": "2层",
              "open": false
            },
            {
              "id": "91",
              "name": "3层",
              "open": false
            },
            {
              "id": "92",
              "name": "4层",
              "open": false
            },
            {
              "id": "93",
              "name": "5层",
              "open": false
            },
            {
              "id": "94",
              "name": "6层",
              "open": false
            }
          ]
        },
        {
          "id": "1",
          "name": "萃雅1栋",
          "open": false,
          'lc': [{
              "id": "1",
              "name": "1层",
              "open": false
            },
            {
              "id": "2",
              "name": "2层",
              "open": false
            },
            {
              "id": "3",
              "name": "3层",
              "open": false
            },
            {
              "id": "4",
              "name": "4层",
              "open": false
            },
            {
              "id": "5",
              "name": "5层",
              "open": false
            },
            {
              "id": "6",
              "name": "6层",
              "open": false
            }
          ]
        },
        {
          "id": "2",
          "name": "萃雅2栋",
          "open": false,
          'lc': [{
              "id": "7",
              "name": "1层",
              "open": false
            },
            {
              "id": "8",
              "name": "2层",
              "open": false
            },
            {
              "id": "9",
              "name": "3层",
              "open": false
            },
            {
              "id": "10",
              "name": "4层",
              "open": false
            },
            {
              "id": "11",
              "name": "5层",
              "open": false
            },
            {
              "id": "12",
              "name": "6层",
              "open": false
            }
          ]
        },
        {
          "id": "3",
          "name": "萃雅3栋",
          "open": false,
          'lc': [{
              "id": "13",
              "name": "1层",
              "open": false
            },
            {
              "id": "14",
              "name": "2层",
              "open": false
            },
            {
              "id": "15",
              "name": "3层",
              "open": false
            },
            {
              "id": "16",
              "name": "4层",
              "open": false
            },
            {
              "id": "17",
              "name": "5层",
              "open": false
            },
            {
              "id": "18",
              "name": "6层",
              "open": false
            }
          ]
        },
        {
          "id": "4",
          "name": "萃雅4栋",
          "open": false,
          'lc': [{
              "id": "19",
              "name": "1层",
              "open": false
            },
            {
              "id": "20",
              "name": "2层",
              "open": false
            },
            {
              "id": "21",
              "name": "3层",
              "open": false
            },
            {
              "id": "22",
              "name": "4层",
              "open": false
            },
            {
              "id": "23",
              "name": "5层",
              "open": false
            },
            {
              "id": "24",
              "name": "6层",
              "open": false
            }
          ]
        },
        {
          "id": "5",
          "name": "萃雅5栋",
          "open": false,
          'lc': [{
              "id": "25",
              "name": "1层",
              "open": false
            },
            {
              "id": "26",
              "name": "2层",
              "open": false
            },
            {
              "id": "27",
              "name": "3层",
              "open": false
            },
            {
              "id": "28",
              "name": "4层",
              "open": false
            },
            {
              "id": "29",
              "name": "5层",
              "open": false
            },
            {
              "id": "30",
              "name": "6层",
              "open": false
            }
          ]
        },
        {
          "id": "6",
          "name": "萃雅6栋",
          "open": false,
          'lc': [
            [{
                "id": "31",
                "name": "1层",
                "open": false
              },
              {
                "id": "32",
                "name": "2层",
                "open": false
              },
              {
                "id": "33",
                "name": "3层",
                "open": false
              },
              {
                "id": "34",
                "name": "4层",
                "open": false
              },
              {
                "id": "35",
                "name": "5层",
                "open": false
              },
              {
                "id": "36",
                "name": "6层",
                "open": false
              }
            ]
          ]
        }
      ]
    }, {
      'id': '3',
      'open': false,
      'name': '北校区',
      'gy': [{
          "id": "28",
          "name": "八栋",
          "open": false,
          'lc': [{
              "id": "172",
              "name": "1层",
              "open": false
            },
            {
              "id": "173",
              "name": "2层",
              "open": false
            },
            {
              "id": "174",
              "name": "3层",
              "open": false
            },
            {
              "id": "175",
              "name": "4层",
              "open": false
            },
            {
              "id": "176",
              "name": "5层",
              "open": false
            },
            {
              "id": "177",
              "name": "6层",
              "open": false
            }
          ]
        },
        {
          "id": "22",
          "name": "二栋",
          "open": false,
          'lc': [{
              "id": "178",
              "name": "1层",
              "open": false
            },
            {
              "id": "179",
              "name": "2层",
              "open": false
            },
            {
              "id": "180",
              "name": "3层",
              "open": false
            },
            {
              "id": "181",
              "name": "4层",
              "open": false
            },
            {
              "id": "182",
              "name": "5层",
              "open": false
            },
            {
              "id": "183",
              "name": "6层",
              "open": false
            }
          ]
        },
        {
          "id": "26",
          "name": "六栋",
          "open": false,
          'lc': [{
              "id": "184",
              "name": "1层",
              "open": false
            },
            {
              "id": "185",
              "name": "2层",
              "open": false
            },
            {
              "id": "186",
              "name": "3层",
              "open": false
            },
            {
              "id": "187",
              "name": "4层",
              "open": false
            },
            {
              "id": "188",
              "name": "5层",
              "open": false
            },
            {
              "id": "189",
              "name": "6层",
              "open": false
            }
          ]
        },
        {
          "id": "27",
          "name": "七栋",
          "open": false,
          'lc': [{
              "id": "190",
              "name": "1层",
              "open": false
            },
            {
              "id": "191",
              "name": "2层",
              "open": false
            },
            {
              "id": "192",
              "name": "3层",
              "open": false
            },
            {
              "id": "193",
              "name": "4层",
              "open": false
            },
            {
              "id": "194",
              "name": "5层",
              "open": false
            },
            {
              "id": "195",
              "name": "6层",
              "open": false
            }
          ]
        },
        {
          "id": "23",
          "name": "三栋",
          "open": false,
          'lc': [{
              "id": "196",
              "name": "1层",
              "open": false
            },
            {
              "id": "197",
              "name": "2层",
              "open": false
            },
            {
              "id": "198",
              "name": "3层",
              "open": false
            },
            {
              "id": "199",
              "name": "4层",
              "open": false
            },
            {
              "id": "200",
              "name": "5层",
              "open": false
            },
            {
              "id": "201",
              "name": "6层",
              "open": false
            }
          ]
        },
        {
          "id": "24",
          "name": "四栋",
          "open": false,
          'lc': [{
              "id": "202",
              "name": "1层",
              "open": false
            },
            {
              "id": "203",
              "name": "2层",
              "open": false
            },
            {
              "id": "204",
              "name": "3层",
              "open": false
            },
            {
              "id": "205",
              "name": "4层",
              "open": false
            },
            {
              "id": "206",
              "name": "5层",
              "open": false
            },
            {
              "id": "207",
              "name": "6层",
              "open": false
            }
          ]
        },
        {
          "id": "25",
          "name": "五栋",
          "open": false,
          'lc': [{
              "id": "208",
              "name": "1层",
              "open": false
            },
            {
              "id": "209",
              "name": "2层",
              "open": false
            },
            {
              "id": "210",
              "name": "3层",
              "open": false
            },
            {
              "id": "211",
              "name": "4层",
              "open": false
            },
            {
              "id": "212",
              "name": "5层",
              "open": false
            },
            {
              "id": "213",
              "name": "6层",
              "open": false
            }
          ]
        },
        {
          "id": "21",
          "name": "一栋",
          "open": false,
          'lc': [{
              "id": "214",
              "name": "1层",
              "open": false
            },
            {
              "id": "215",
              "name": "2层",
              "open": false
            },
            {
              "id": "216",
              "name": "3层",
              "open": false
            },
            {
              "id": "217",
              "name": "4层",
              "open": false
            },
            {
              "id": "218",
              "name": "5层",
              "open": false
            },
            {
              "id": "219",
              "name": "6层",
              "open": false
            }
          ]
        }
      ]
    }],
  },
  /**
   * 收缩核心代码
   */
  kindToggle(e) {
    const id = e.currentTarget.id
    const xq = this.data.xq
    for (let i = 0, len = xq.length; i < len; ++i) {
      if (xq[i].id === id) {
        xq[i].open = !xq[i].open
      } else {
        xq[i].open = false
      }
    }
    this.setData({
      xq: xq
    })
  },

  kindToggle2(e) {
    console.log(e)
    const id = e.currentTarget.id,
      fid = e.currentTarget.dataset.fid
    const xq = this.data.xq
    for (let i = 0, len = xq[fid].gy.length; i < len; ++i) {
      if (xq[fid].gy[i].id === id) {
        xq[fid].gy[i].open = !xq[fid].gy[i].open
      } else {
        xq[fid].gy[i].open = false
      }
    }
    this.setData({
      xq: xq
    })
  },
  kindToggle3(e) {
    console.log(e)
    const id = e.currentTarget.id,
      fid = e.currentTarget.dataset.fid,
      gid = e.currentTarget.dataset.gid,
      xqid = e.currentTarget.dataset.xqid,
      gyid = e.currentTarget.dataset.gyid
    var room = []
    const xq = this.data.xq
    room['gy'] = xq[fid].gy[gid].name

    for (let i = 0, len = xq[fid].gy[gid].lc.length; i < len; ++i) {
      if (xq[fid].gy[gid].lc[i].id === id) {
        xq[fid].gy[gid].lc[i].open = !xq[fid].gy[gid].lc[i].open
        room['lc'] = xq[fid].gy[gid].lc[i].name
      } else {
        xq[fid].gy[gid].lc[i].open = false
      }
    }
    this.setData({
      xq: xq,
      xqid: xqid,
      gyid: gyid,
      lcid: id,
      room: room,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  // 转 arr 为 obj
  handle: function(arr) {
    var result = {};
    for (var key in arr) {
      result[key] = arr[key];
    }
    console.log('obj', result)
    return result;
  },
  // 输入
  fjidInput(e) {
    console.log(e)
    var _this = this,
      fjid = e.detail.value
    const room = _this.data.room
    room['fj'] = fjid
    room['id'] = _this.data.xqid + '-' + _this.data.gyid + '--' + _this.data.lcid + '-' + fjid
    _this.setData({
      fjid: fjid,
      room: room
    })
  },
  // 确认
  summit(e) {
    var _this = this
    var room = _this.data.room
    if (_this.data.fjid) {
      var msg = _this.data.room['gy'] + '-' + _this.data.room['lc'] + '-' + _this.data.fjid

      try {
        wx.setStorageSync('room', _this.handle(_this.data.room))
      } catch (e) {
        console.log(e)
        app.showTips('错误', '请稍后一会再试')
      }
      app._room = _this.data.room
      console.log('app.room', app._room)
      app.showTips('确认信息', '寝室：' + msg, '', '', '/pages/index/webill/webill')
    } else {
      app.showTips('提示', '请填写寝室号')
    }
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