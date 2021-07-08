// pages/student/student.js
var app=getApp()
var server=app.globalData.server
Page({
  // 进入添加学生页面
  addStudent(){
    var that=this
    wx.navigateTo({
      url: '../add/add?classId='+that.data.classId+'&className='+that.data.className
    })
  },
  // 载入该班级学生
  loadStudents(){
    var that=this
    wx.request({
      url: server+"/student/query?classId="+this.data.classId,
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
  // 将学生移出班级
  removeStudent(e){
    var that=this
    var index=e.currentTarget.dataset.index
    var studentId=e.currentTarget.dataset.studentid
    wx.request({
      url: server+'/student',
      method:'PUT',
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        studentId:studentId
      },
      success(){
        that.setData({
          ['students['+index+'].classId']:''
        })
      }
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    classId:'',
    className:'',
    students:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      classId:options.classId,
      className:options.className
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
    // 注意异步问题，可以生命周期先后顺序解决异步问题
    this.loadStudents()
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