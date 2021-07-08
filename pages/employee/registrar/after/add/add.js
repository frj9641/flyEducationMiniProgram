// pages/add/add.js
var app=getApp()
var server=app.globalData.server
Page({
  filter(e){
    var marketName=e.currentTarget.dataset.marketname
    if(marketName=='全部'){
      this.setData({
        open:false,
        market:marketName,
        isAll:1
      })
    }else{
      this.setData({
        open:false,
        market:marketName,
        isAll:0
      })
    }
  },
  // 前往自定义添加学员页面
  toAddPage(){
    var classId=this.data.classId
    var className=this.data.className
    wx.navigateTo({
      url: '../search/search?classId='+classId+'&className='+className,
    })
  },
  // 添加学生至班级
  addStudent(e){
    var that=this
    var index=e.currentTarget.dataset.index
    var studentId=e.currentTarget.dataset.studentid
    var classId=this.data.classId
    var className=this.data.className
    wx.request({
      url: server+'/student',
      method:'PUT',
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        classId:classId,
        className:className,
        studentId:studentId
      },
      success(){
        that.setData({
          ['students['+index+'].classId']:classId
        })
      }
    })
  },
  // 载入未分配班级的学生
  loadStudents(){
    var that=this
    var markets=this.data.markets
    wx.request({
      url: server+'/student/add?registrarUnionid='+app.globalData.userUnionid,
      success(res){
        that.setData({
          students:res.data.ext.students,
          markets:markets.concat(Array.from(new Set(res.data.ext.students.map(function(v) {return v.marketName}))))
        })
      }
    })
  },
  kindToggle: function (e) {
    var open=this.data.open
    this.setData({
      open:!open
    });
  },
  /**
   * 页面的初始数据
   */
  data: {
    isAll:1,
    market:'全部',
    markets:['全部'],
    students:[],
    classId:'',
    className:'',
    open:false
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