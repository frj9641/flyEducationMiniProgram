// pages/class/teacher/teacher.js
var app=getApp()
var server=app.globalData.server
Page({
  // 载入家长反馈
  loadFeedback(){
    var that=this
    wx.request({
      url: server+'/feedback?classId='+this.data.classId,
      success(res){
        that.setData({
          feedbacks:res.data.ext.feedbacks
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
  /**
   * 页面的初始数据
   */
  data: {
    classId:'',
    feedbacks:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      classId:options.classId
    })
    this.loadFeedback()
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