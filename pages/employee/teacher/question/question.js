// pages/employee/teacher/question/question.js
var app=getApp()
var server=app.globalData.server
Page({
  // 载入班级的往期作业
  loadHomeworks(){
    var that=this
    wx.request({
      url: server+'/homework?classId='+this.data.classId,
      success(res){
        that.setData({
          homeworks:res.data.ext.homeworks
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
  delete(e){
    var that=this
    var homeworkId=e.currentTarget.dataset.homeworkid
    var index=e.currentTarget.dataset.index
    wx.showModal({
      title:'提示',
      content:'您将删除该项作业',
      success(res){
        if(res.confirm){
          wx.request({
            url: server+'/homework',
            method:'DELETE',
            header:{
              'content-type': 'application/x-www-form-urlencoded'
            },
            data:{
              homeworkId:homeworkId
            },
            success(){
              that.data.homeworks.splice(index,1)
              that.setData({
                homeworks:that.data.homeworks
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
  score(e){
    var homeworkId=e.currentTarget.dataset.homeworkid
    wx.navigateTo({
      url: '../answer/answer?homeworkId='+homeworkId,
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    classId:'',
    homeworks:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      classId:options.classId
    })
    this.loadHomeworks()
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