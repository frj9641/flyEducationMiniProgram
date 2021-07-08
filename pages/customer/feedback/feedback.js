// pages/evaluation/evaluation.js
var app=getApp()
var server=app.globalData.server
Page({
  data: {
    flag: 0,
    noteMaxLen: 200, // 最多放多少字
    info: "",
    noteNowLen: 0,//备注当前字数
    classId:'',
    studentId:''
  },
  // 监听字数
  bindTextAreaChange: function (e) {
    var that = this
    var value = e.detail.value,
      len = parseInt(value.length);
    if (len > that.data.noteMaxLen)
      return;
    that.setData({ info: value, noteNowLen: len })

  },
  // 提交清空当前值
  bindSubmit: function () {
    var that = this;
    wx.request({
      url: server+'/feedback',
      method:'POST',
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        classId:that.data.classId,
        studentId:that.data.studentId,
        mark:that.data.flag,
        word:that.data.info
      },
      success(){
        wx.navigateBack({
          complete: (res) => {
            wx.showModal({
              title:'提示',
              content:'发布成功',
              showCancel:false,
              cancelColor: 'cancelColor',
            })
          },
        })
      },
      fail(){
        wx.showModal({
          title:'提示',
          content:'服务器开小差了，请联系工作人员',
          showCancel:false,
          cancelColor: 'cancelColor',
        })
      }
    })
  },
  changeColor1: function () {
    var that = this;
    that.setData({
      flag: 1
    });
  },
  changeColor2: function () {
    var that = this;
    that.setData({
      flag: 2
    });
  },
  changeColor3: function () {
    var that = this;
    that.setData({
      flag: 3
    });
  },
  changeColor4: function () {
    var that = this;
    that.setData({
      flag: 4
    });
  },
  changeColor5: function () {
    var that = this;
    that.setData({
      flag: 5
    });
  },
  onLoad(options){
    this.setData({
      classId:options.classId,
      studentId:options.studentId
    })
  }
})
