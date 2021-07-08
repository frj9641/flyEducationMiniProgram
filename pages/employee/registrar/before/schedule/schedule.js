// pages/order/order.js
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
  // 前往自定义订单页面
  toAddPage(){
    wx.navigateTo({
      url: '../search/search',
    })
  },
  // 载入咨询列表
  loadSchedules(){
    var that=this
    var markets=this.data.markets
    wx.request({
      url: server+'/order/schedule?registrarUnionid='+app.globalData.userUnionid,
      success(res){
        that.setData({
          schedules:res.data.ext.orders,
          markets:markets.concat(Array.from(new Set(res.data.ext.orders.map(function(v) {return v.marketName}))))
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
  // 报名失败
  changeIsIntent(e){
    var orderId=e.currentTarget.dataset.orderid
    var index=e.currentTarget.dataset.index
    var that=this
    wx.request({
      url: server+'/order/intent',
      method:'PUT',
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        orderId:orderId
      },
      success(){
        that.setData({
          ['schedules['+index+'].isIntent']:0
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
  // 报名成功
  changeIsSuccess(e){
    var orderId=e.currentTarget.dataset.orderid
    wx.navigateTo({
      url: '../account/account?orderId='+orderId,
    })
  },
  //修改意愿时间
  dateSubmit(e){
    var date=e.detail.value.date
    var orderId=this.data.orderId
    var index=this.data.index
    var that=this
    wx.request({
      url: server+'/order/date',
      method:'PUT',
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        date:date,
        orderId:orderId
      },
      success(){
        that.setData({
          ['schedules['+index+'].date']:date,
          dialog1:false
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
  //载入修改意愿时间的信息
  loadSchedule(e){
    this.setData({
      orderId:e.currentTarget.dataset.orderid,
      index:e.currentTarget.dataset.index
    })
  },
  // 半屏框开启
  open(e) {
    this.loadSchedule(e)
    this.setData({
        dialog1: true
    });
  },
  // 半屏框关闭
  close: function() {
    this.setData({
        dialog1: false,
    });
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
    schedules:[],
    dialog1: false,
    orderId:'',
    index:'',
    open:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    this.loadSchedules()
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