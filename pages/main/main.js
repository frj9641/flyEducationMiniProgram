// pages/main/main.js
var app=getApp()
var server=app.globalData.server
var duty=app.globalData.duty
Page({
  toBoard(res){
    var session_key=app.globalData.session_key
    var errMsg=res.detail.errMsg
    if(session_key!=''){
      if(errMsg=='getUserInfo:ok'){
        wx.request({
          url: server+'/userInfo',
          method:'POST',
          header:{
            'content-type': 'application/x-www-form-urlencoded'
          },
          data:{
            encryptedData:res.detail.encryptedData,
            iv:res.detail.iv,
            session_key:session_key
          },
          success(res){
            app.globalData.userOpenid=res.data.ext.info.openid
            app.globalData.userUnionid=res.data.ext.info.unionid
            wx.navigateTo({
              url: '../customer/board/board',
            })
          }
        })
      }
    }else{
      wx.navigateTo({
        url: '../customer/board/board',
      })
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    duty:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 解决异步
    if(duty&&duty!=''){
      this.setData({
        duty:duty
      })
    }else{
      app.dutyCallback=duty=>{
        if(duty!=''){
          this.setData({
            duty:duty
          })
        }
      }
    }
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
    // app.getUserOpenId()
    if(duty&&duty!=''){
      this.setData({
        duty:duty
      })
    }else{
      app.dutyCallback=duty=>{
        if(duty!=''){
          this.setData({
            duty:duty
          })
        }
      }
    }
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