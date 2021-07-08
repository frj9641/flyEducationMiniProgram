// pages/poster/poster.js
var app=getApp()
var server=app.globalData.server
Page({
  // 老客户跳过填表
  skipSubmit(){
    var inf=this.data.customerId
    var that=this.data
    if(inf!=null){
      // 老用户
      wx.request({
        url: server+'/order/',
        method:'POST',
        header:{
          'content-type': 'application/x-www-form-urlencoded'
        },
        data:{
          customerId:that.customerId,
          marketId:that.marketId
        },
        success(res){
          wx.navigateBack({
            complete: () => {
              wx.showModal({
                title:'提示',
                content:res.data.ext.msg,
                showCancel:false,
                cancelColor: 'cancelColor',
              })
            },
          })
        },
        fail(){
          wx.showModal({
            title:'提示',
            content:'服务器开小差了，请联系工作人员',
            showCancel:false,
            cancelColor: 'cancelColor',
          })
        }
      })
    }else{
      // 新用户
      wx.navigateTo({
        url: "../../customer/registry/registry?marketId="+that.marketId
      })
    }
  },
  // 获取老用户的信息
  getUserInformation(){
    var that=this
    wx.request({
      url: server+'/customer?unionid='+app.globalData.userUnionid,
      success(res){
        that.setData({
          customerId:res.data.ext.id
        })
      },
      fail(){
        wx.showModal({
          title:'提示',
          content:'服务器开小差了，请联系工作人员',
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
    posterUrl:'',
    marketId:'',
    customerId:'',
    server:server
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      marketId:options.marketId,
      posterUrl:options.posterUrl,
    })
    // 进入海报页面时获取老用户的信息
    this.getUserInformation()
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