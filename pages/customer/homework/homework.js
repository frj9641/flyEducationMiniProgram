// pages/customer/homework/homework.js
var app=getApp()
var server=app.globalData.server
Page({
  preview(e){
    var photoUrl=e.currentTarget.dataset.photourl
    var preview=[]
    for(var i=0;i<photoUrl.length;i++){
      preview.push(server+'/photo/'+photoUrl[i])
    }
    wx.previewImage({
      urls: preview,
    })
  },
  // 载入班级的往期作业
  loadHomeworks(){
    var that=this
    wx.request({
      url: server+'/homework/mark',
      method:'POST',
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        classId:that.data.classId,
        studentId:that.data.studentId
      },
      success(res){
        that.setData({
          homeworks:res.data.ext.homeworks
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
  doHomework(e){
    var homeworkId=e.currentTarget.dataset.homeworkid
    var studentId=this.data.studentId
    var scoreId=e.currentTarget.dataset.scoreid
    var isSubmit
    if(scoreId==null){
      isSubmit=0
    }else{
      isSubmit=1
    }
    wx.navigateTo({
      url: '../question/question?homeworkId='+homeworkId+'&studentId='+studentId+'&isSubmit='+isSubmit,
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    classId:'',
    studentId:'',
    homeworks:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      classId:options.classId,
      studentId:options.studentId
    })
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
    this.loadHomeworks()
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