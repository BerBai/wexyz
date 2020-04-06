// pages/index/cet/cet.js
var util = require('../../../utils/util.js');
import {
  IndexModel
} from '../../../models/index.js'
let indexModel = new IndexModel()
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    curselected: false,
    name_focus: false,
    id_focus: false,
    idCard_focus: false,
    verimg_focus: false,
    idWarn: '',
    name: '',
    id: '',
    idCookie: '',
    result: '',
    dq: {
      "sn": "2019年下半年全国大学英语四、六级考试（含口试）",
      "subn": "仅限查询2019年下半年考试成绩。",
      "qt": "2020/02/21 10:00:00",
      "rdsub": [{
        "code": "CET6-D",
        "tab": "CET6_192_DANGCI",
        "name": "全国大学英语六级考试(CET6)",
        "en": "2019年12月全国大学英语六级考试(CET6)"
      }, {
        "code": "CET4-D",
        "tab": "CET4_192_DANGCI",
        "name": "全国大学英语四级考试(CET4)",
        "en": "2019年12月全国大学英语四级考试(CET4)"
      }]
    }

  },
  changeModule: function() {
    this.setData({
      curselected: !this.data.curselected,
      result: ''
    });
  },
  inputFocus: function(e) {
    console.log(e)
    var id = e.target.id,
      newData = {};
    console.log(id);
    newData[id + '_focus'] = true;
    this.setData(newData);
  },
  inputBlur: function(e) {
    var id = e.target.id,
      newData = {};
    newData[id + '_focus'] = false;
    this.setData(newData);
  },
  checkInput: function(e) {
    // console.log(e)
    var name = e.target.dataset.name,
      value = e.detail.value;
    var newData = {};
    newData[name + ''] = value;
    this.setData(newData);
  },
  // 刷新验证码
  reVer() {
    var _this = this;
    if (!_this.data.curselected) {
      indexModel.getCetIdV('', (res) => {
        if (res.ret == 200)
          _this.setData({
            verimg: res.content,
            idCookie: res.cookie
          })
      })
    }
  },
  submitForm: function(e) {
    console.log(e)
    var formData = e.detail.value || [],
      _this = this,
      curselected = this.data.curselected;
    if (!curselected) { // 查询准考证
      console.log(formData)
      if (formData.name && formData.idCard && formData.verimgT) {
        indexModel.getCetId(_this.data.idCookie, formData.name, formData.idCard, formData.verimgT , (res) => {
          console.log(res)
          if (res.ExceuteResultType == 1) {
            var result = res.Message
            result['isS'] = false
            _this.setData({
              result: result
            })
          } else {
            app.showTips('提示', res.Message)
          }
        })
      } else {
        app.showTips('提示', '请填写未填项')
      }

    } else {
      var token = wx.getStorageSync('token').token || false;
      if (formData.name && formData.id) {
        indexModel.getCet(token, (res) => {
          console.log(res)
          if (res.status) {
            var result = res[0]
            result['isS'] = true
            _this.setData({
              result: result
            })
          } else {
            app.showTips('提示', res.msg)
          }
        })
      } else {
        app.showTips('提示', '请填写未填项')
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this
    if (!_this.data.curselected) {
      indexModel.getCetIdV('', (res) => {
        if (res.ret == 200)
          _this.setData({
            verimg: res.content,
            idCookie: res.cookie
          })
      })
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