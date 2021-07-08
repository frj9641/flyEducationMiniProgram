// pages/class/teacher/teacher.js
var app=getApp()
var server=app.globalData.server
Page({
  filter(e){
    var day=e.currentTarget.dataset.day
    if(day=='非今日'){
      this.setData({
        open:false,
        day:day,
        isToday:0
      })
    }else{
      this.setData({
        open:false,
        day:day,
        isToday:1
      })
    } 
  },
  // 载入今日班级信息
  loadClass(){
    var that=this
    wx.request({
      url: server+'/classInfo/today?teacherUnionid='+app.globalData.userUnionid,
      success(res){
        that.setData({
          classes:res.data.ext.classInfos
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
  // 前往签到页面
  signin(e){
    var classId=e.currentTarget.dataset.classid
    var day=this.data.day
    wx.navigateTo({
      url: '../sign/sign?classId='+classId+'&day='+day,
    })
  },
  homework(e){
    var classId=e.currentTarget.dataset.classid;
    wx.navigateTo({
      url: '../homework/homework?classId='+classId,
    })
  },
  school(e){
    var classId=e.currentTarget.dataset.classid;
    wx.navigateTo({
      url: '../school/school?classId='+classId,
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    isToday:1,
    days:['今日','非今日'],
    day:'今日',
    classes:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadClass()
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