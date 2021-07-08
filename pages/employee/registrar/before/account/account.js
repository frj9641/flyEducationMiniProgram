// pages/employee/employee.js
var app=getApp()
var server=app.globalData.server
Page({
  // 载入订单
  loadOrder(){
    var that=this
    wx.request({
      url: server+'/account?orderId='+this.data.orderId,
      success(res){
        that.setData({
          studentName:res.data.ext.studentName,
          marketName:res.data.ext.marketName,
          price:res.data.ext.price
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
  accountSubmit(res){
    var that=this.data
    var inf=res.detail.value
    if(inf.price){
      wx.request({
        url: server+'/account',
        method:'POST',
        header:{
          'content-type': 'application/x-www-form-urlencoded'
        },
        data:{
          orderId:that.orderId,
          price:inf.price,
        },
        success(){
          wx.navigateBack({
            complete: () => {
              wx.showModal({
                title:'提示',
                content:'报名成功',
                showCancel:false,
                cancelColor: 'cancelColor',
              })
            },
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
    }else{
      wx.showModal({
        title:'提示',
        content:'请填写实缴金额！',
        showCancel:false,
        cancelColor: 'cancelColor',
      })
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    orderId:'',
    studentName:'',
    marketName:'',
    price:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderId:options.orderId
    })
    this.loadOrder()
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