//about.js
import {
  WellModel
} from '../../../models/well.js'
 
let wellModel = new WellModel()
//获取应用实例
var app = getApp();
const isTel = (value) => !/^1[3456789]\d{9}$/.test(value)
const isEmail = (value) => !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value)

Page({
  data: {
    sex: [{
      label: '👨帅锅',
      value: '0'
    }, {
      label: '👩美女',
      value: '1'
    }],
    onsex: '0',
    name: '',
    xh: '',
    sclass: '',
    room: '',
    qq: '',
    tel: '',
    telerror: '',
    content: '',
    email: '',
    emailerror: '',
    isSubmit: false,
    //推送消息
    openid: '',
    token: '',
    data: [],

  },
  onNameChange(e) {
    console.log('name', e)
    this.setData({
      name: e.detail.value,
    })
  },
  onXhChange(e) {
    console.log('xh', e)
    this.setData({
      xh: e.detail.value,
    })
  },
  onSclassChange(e) {
    console.log('sclass', e)
    this.setData({
      sclass: e.detail.value,
    })
  },
  onRoomChange(e) {
    console.log('room', e)
    this.setData({
      room: e.detail.value,
    })
  },
  onQqChange(e) {
    console.log('qq', e)
    this.setData({
      qq: e.detail.value,
    })
  },
  onEmailChange(e) {
    console.log('email', e)
    this.setData({
      emailerror: isEmail(e.detail.value),
      email: e.detail.value,
    })
  },
  onEmailError() {
    wx.showModal({
      title: '重要！请正确输入邮箱',
      showCancel: !1,
    })
  },
  onSexChange(e) {
    console.log(e)
    this.setData({
      onsex: e.detail.value,
    })
  },
  onCheckboxChange(e) {
    console.log(e)
    this.setData({
      checked: e.detail.checked,
    })
  },
  onTelChange(e) {
    console.log('onChange', e)
    this.setData({
      telerror: isTel(e.detail.value),
      tel: e.detail.value,
    })
  },
  onContentChange(e) {
    console.log('content', e)
    this.setData({
      content: e.detail.value,
    })
  },
  onFocus(e) {
    this.setData({
      error: isTel(e.detail.value),
    })
    console.log('onFocus', e)
  },
  onBlur(e) {
    this.setData({
      error: isTel(e.detail.value),
    })
    console.log('onBlur', e)
  },
  onConfirm(e) {
    console.log('onConfirm', e)
  },
  onClear(e) {
    console.log('onClear', e)
    this.setData({
      error: true,
      value: '',
    })
  },
  onTelError() {
    wx.showModal({
      title: '重要！请正确输入11位电话号码',
      showCancel: !1,
    })
  },
  showTips(title, content, pages = '') {
    wx.showModal({
      title: title,
      content: content,
      showCancel: false,
      success(e) {
        if (pages) {
          // 返回
          wx.switchTab({
            url: pages
          })
        }
      }
    })
  },
  showLoad(title, duration) {
    wx.showLoading({
      title: title,
      icon: 'loading',
      mask: true,
      duration: duration || 10000
    })
  },
  copyText: function(e) {
    console.log(e)
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function(res) {
        wx.getClipboardData({
          success: function(res) {
            wx.showToast({
              title: '内容复制成功'
            })
          }
        })
      }
    })
  },

  templateNotice(e) {

  },

  onSubmit(e) {
    var _this = this
    var onsex = _this.data.onsex,
      name = _this.data.name,
      xh = _this.data.xh,
      sclass = _this.data.sclass,
      room = _this.data.room,
      qq = _this.data.qq,
      tel = _this.data.tel,
      telerror = _this.data.telerror,
      content = _this.data.content,
      email = _this.data.email,
      emailerror = _this.data.emailerror
    console.log(content)
    // console.log(onsex , name , xh , sclass , room , qq , tel , content , email)
    if (onsex && name && xh && sclass && room && qq && tel && content && email) {
      if (telerror || emailerror) {
        // console.log(telerror || emailerror)s
        _this.showTips('格式错误', '请检查邮箱或电话是否填写错误')
      } else {
        _this.showLoad('提交中')
        _this.setData({
          isSubmit: true
        })
        wellModel.wellInsert(onsex, name, xh, sclass, room, qq, tel, content, email, (res) => {
          console.log(res)
          if (res.id) {
            wx.hideLoading()
            wx.setClipboardData({
              data: '721261412',
              success(res) {
                wx.getClipboardData({
                  success(res) {
                    console.log(res.data) // data
                  }
                })
              }
            })
            _this.showTips('报名成功', '请加QQ群（已复制）留意后续邮箱或电话通知', '/pages/index/index')
          }
          _this.setData({
            isSubmit: false
          })
        })
      }
    } else {
      _this.showTips('信息不完全', '请检查是否有未填项')
    }
  },
  onLoad: function() {
    var _this = this
    _this.setData({
      isSubmit: false
    })
  },

});