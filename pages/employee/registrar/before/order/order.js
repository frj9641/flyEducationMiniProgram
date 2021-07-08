// pages/order/order.js
var app=getApp()
var server=app.globalData.server
Page({
  // 载入咨询列表
  loadOrders(){
    var that=this
    wx.request({
      url: server+'/order?registrarUnionid='+app.globalData.userUnionid,
      success(res){
        that.setData({
          orders:res.data.ext.orders
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
  // 添加好友状态修改
  changeIsAdded(e){
    var orderId=e.currentTarget.dataset.orderid
    var index=e.currentTarget.dataset.index
    var that=this
    wx.request({  
      url: server+'/order/add',
      method:'PUT',
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        orderId:orderId
      },
      success(){
        that.setData({
          ['orders['+index+'].isAdded']:1
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
  // 会话完成状态修改
  changeIsFinished(e){
    var orderId=e.currentTarget.dataset.orderid
    var index=e.currentTarget.dataset.index
    var that=this
    wx.request({
      url: server+'/order/finish',
      method:'PUT',
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        orderId:orderId
      },
      success(){
        that.setData({
          ['orders['+index+'].isFinished']:1
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
  // 会话完成状态与意向状态修改
  changeIsFinishedAndIsIntent(e){
    var orderId=e.currentTarget.dataset.orderid
    var index=e.currentTarget.dataset.index
    var that=this
    wx.request({
      url: server+'/order/finishAndIntent',
      method:'PUT',
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        orderId:orderId
      },
      success(){
        that.setData({
          ['orders['+index+'].isFinished']:1
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
  /**
   * 页面的初始数据
   */
  data: {
    orders:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadOrders()
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