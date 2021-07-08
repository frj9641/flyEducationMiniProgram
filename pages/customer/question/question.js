// pages/customer/question/question.js
var app=getApp()
var server=app.globalData.server
Page({
  preview(){
    var photoUrl=this.data.photoUrl
    var preview=[]
    for(var i=0;i<photoUrl.length;i++){
      preview.push(server+'/photo/'+photoUrl[i])
    }
    wx.previewImage({
      urls: preview,
    })
  },
  doHomework(){
    wx.navigateTo({
      url: '../answer/answer?studentId='+this.data.studentId+'&homeworkId='+this.data.homeworkId,
    })
  },
  loadHomework(){
    var that=this
    wx.request({
      url: server+'/homework/question?homeworkId='+this.data.homeworkId,
      success(res){
        that.setData({
          word:res.data.ext.homework.word,
          photoUrl:res.data.ext.homework.photoUrl
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
  /**
   * 页面的初始数据
   */
  data: {
    homeworkId:'',
    word:'',
    photoUrl:'',
    server:server,
    studentId:'',
    isSubmit:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      homeworkId:options.homeworkId,
      studentId:options.studentId,
      isSubmit:options.isSubmit
    })
    this.loadHomework()
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