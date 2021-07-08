// pages/employee/teacher/school/school.js
var app=getApp()
var server=app.globalData.server
Page({
  loadStudents(){
    var that=this
    wx.request({
      url: server+'/student/query?classId='+this.data.classId,
      success(res){
        that.setData({
          students:res.data.ext.students
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
  open(e){
    this.setData({
      dialog1: true
    });
    this.loadStudent(e)
  },
  // 半屏框关闭
  close() {
    this.setData({
        dialog1: false,
    });
  },
  schoolSubmit(res){
    var that=this
    var mark=res.detail.value.mark
    if(mark){
      wx.request({
        url: server+'/school',
        method:'POST',
        header:{
          'content-type': 'application/x-www-form-urlencoded'
        },
        data:{
          classId:that.data.classId,
          studentId:that.data.studentId,
          mark:mark
        },
        success(){
          that.close()
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
    }else{
      wx.showModal({
        title:'提示',
        content:'分数为0-150之间的整数！',
        showCancel:false,
        cancelColor: 'cancelColor',
      })
    }
  },
  loadStudent(e){
    this.setData({
      studentId:e.currentTarget.dataset.studentid,
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    dialog1:'',
    classId:'',
    students:[],
    studentId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      classId:options.classId
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