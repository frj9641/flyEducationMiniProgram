// pages/board/board.js
var app=getApp()
var server=app.globalData.server
Page({
  // 载入我的课程
  loadclasses(){
    var that=this
    wx.request({
      url: server+'/student/class?customerUnionid='+app.globalData.userUnionid,
      success(res){
        that.setData({
          classes:res.data.ext.classes
        })
      },
      fail(){
        wx.showModal({
          title:'提示',
          content:'服务器开小差了，请联系工作人员！',
          showCancel:false,
          cancelColor: 'cancelColor',
        })
      }
    })
  },
  // 前往作业查询页面
  toHomework(e){
    var classId=e.currentTarget.dataset.classid
    var studentId=e.currentTarget.dataset.studentid
    wx.navigateTo({
      url: '../homework/homework?classId='+classId+'&studentId='+studentId,
    })
  },
  // 前往考核统计页面
  toStatistics(e){
    var studentId=e.currentTarget.dataset.studentid
    wx.navigateTo({
      url: '../statistics/statistics?studentId='+studentId,
    })
  },
  // 前往老师反馈页面
  toFeedback(e){
    var classId=e.currentTarget.dataset.classid
    var studentId=e.currentTarget.dataset.studentid
    wx.navigateTo({
      url: '../feedback/feedback?classId='+classId+'&studentId='+studentId,
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    classes:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadclasses()
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