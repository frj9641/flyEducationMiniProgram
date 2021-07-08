// pages/board/board.js
var app=getApp()
var server=app.globalData.server
Page({
  filter(e){
    var subject=e.currentTarget.dataset.subject
    if(subject=='全部'){
      this.setData({
        subject:subject,
        isAll:1
      })
    }else{
      this.setData({
        subject:subject,
        isAll:0
      })
    }
  },
  // 载入营销课表
  loadLeesons(){
    var that=this
    wx.request({
      url: server+'/market',
      success(res){
        that.setData({
          lessons:res.data.ext.markets
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
  // 用户打开营销课表时将其信息添加至subscriber表（可以考虑前移）
  createAppUser(){
    wx.request({
      url: server+"/subscriber",
      method:'POST',
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        subscriberAppOpenid:app.globalData.userOpenid,
        subscriberUnionid:app.globalData.userUnionid
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
    lessons:[],
    subjects:['全部','语文','数学','英语','编程','物理','化学','生物','地理','历史','政治'],
    subject:'全部',
    isAll:1
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadLeesons()
    this.createAppUser()
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