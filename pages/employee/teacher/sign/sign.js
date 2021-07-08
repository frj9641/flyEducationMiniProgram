// pages/class/sign/sign.js
var util=require('../../../../utils/util')
var app=getApp()
var server=app.globalData.server
Page({
  // 载入班级学生的签到记录
  loadStudents(){
    var classId=this.data.classId
    var that=this
    wx.request({
      url: server+'/student/sign?classId='+classId,
      success(res){
        that.setData({
          students:res.data.ext.signs
        })
      },
      fail(){
        wx.showModal({
          title:'提示',
          content:'服务器开小差了，请联系开发人员！',
          showCancel:false,
          cancelColor: 'cancelColor',
        })
      }
    })
  },
  // 签到
  signin(e){
    var that=this
    var studentId=e.currentTarget.dataset.studentid
    var index=e.currentTarget.dataset.index
    var date=util.formatDate(new Date())
    wx.showModal({
      title:'提示',
      content:'确认考勤状况为签到',
      success(res){
        if(res.confirm){
          wx.request({
            url: server+'/sign',
            method:'POST',
            header:{
              'content-type': 'application/x-www-form-urlencoded'
            },
            data:{
              classId:that.data.classId,
              studentId:studentId,
              date:date,
              mark:1
            },
            success(){
              that.setData({
                ['students['+index+'].mark']:1
              })
            },
            fail(){
              wx.showModal({
                title:'提示',
                content:'服务器开小差了，请联系开发人员！',
                showCancel:false,
                cancelColor: 'cancelColor',
              })
            }
          })
        }
      }
    }) 
  },
  // 迟到
  belate(e){
    var that=this
    var studentId=e.currentTarget.dataset.studentid
    var index=e.currentTarget.dataset.index
    var date=util.formatDate(new Date())
    wx.showModal({
      title:'提示',
      content:'确认考勤状况为迟到',
      success(res){
        if(res.confirm){
          wx.request({
            url: server+'/sign',
            method:'POST',
            header:{
              'content-type': 'application/x-www-form-urlencoded'
            },
            data:{
              classId:that.data.classId,
              studentId:studentId,
              date:date,
              mark:2
            },
            success(){
              that.setData({
                ['students['+index+'].mark']:2
              })
            },
            fail(){
              wx.showModal({
                title:'提示',
                content:'服务器开小差了，请联系开发人员！',
                showCancel:false,
                cancelColor: 'cancelColor',
              })
            }
          })
        }
      }
    })
  },
  // 旷课
  absent(e){
    var that=this
    var studentId=e.currentTarget.dataset.studentid
    var index=e.currentTarget.dataset.index
    var date=util.formatDate(new Date())
    wx.showModal({
      title:'提示',
      content:'确认考勤状况为旷课',
      success(res){
        if(res.confirm){
          wx.request({
            url: server+'/sign',
            method:'POST',
            header:{
              'content-type': 'application/x-www-form-urlencoded'
            },
            data:{
              classId:that.data.classId,
              studentId:studentId,
              date:date,
              mark:3
            },
            success(){
              that.setData({
                ['students['+index+'].mark']:3
              })
            },
            fail(){
              wx.showModal({
                title:'提示',
                content:'服务器开小差了，请联系开发人员！',
                showCancel:false,
                cancelColor: 'cancelColor',
              })
            }
          })
        }
      }
    }) 
  },
  statistics(e){
    var studentId=e.currentTarget.dataset.studentid
    wx.navigateTo({
      url: '../../../customer/statistics/statistics?studentId='+studentId,
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    day:'',
    classId:'',
    students:[],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      classId:options.classId,
      day:options.day
    })
    this.loadStudents()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})