// pages/board/board.js
var app=getApp()
var server=app.globalData.server
Page({
  // 上课时间修改
  changeClassDate(e){
    var classId=e.currentTarget.dataset.classid
    var className=e.currentTarget.dataset.classname
    wx.navigateTo({
      url: '../change/change?classId='+classId,
    })
  },
  // 进入排课页面
  setClassDate(e){
    var classId=e.currentTarget.dataset.classid
    wx.navigateTo({
      url: '../calendar/calendar?classId='+classId,
    })
  },
  // 进入该班的学生管理页面
  toStudent(e){
    var classId=e.currentTarget.dataset.classid
    var className=e.currentTarget.dataset.classname
    wx.navigateTo({
      url: '../student/student?classId='+classId+'&className='+className,
    })
  },
  // 载入该教务管理的所有班级
  loadClassInfo(){
    var that=this
    wx.request({
      url: server+'/classInfo?registrarUnionid='+app.globalData.userUnionid,
      success(res){
        that.setData({
          classInfo:res.data.ext.classInfos
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
  // 班级删除
  removeClassInfo(e){
    var classId=e.currentTarget.dataset.classid
    var index=e.currentTarget.dataset.index
    var that=this
    wx.showModal({
      title:'警告',
      content:'您将删除班级所有信息！',
      success(res){
        if(res.confirm){
          wx.request({
            url: server+'/classInfo',
            method:'DELETE',
            header:{
              'content-type': 'application/x-www-form-urlencoded'
            },
            data:{
              classId:classId
            },
            success(){
              that.data.classInfo.splice(index,1)
              that.setData({
                classInfo:that.data.classInfo
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
  /**
   * 页面的初始数据
   */
  data: {
    classInfo:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadClassInfo()
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