// pages/employee/manager/publish/pulish.js
var app=getApp()
var server=app.globalData.server
Page({
  preview(e){
    var posterUrl=e.currentTarget.dataset.posterurl
    wx.previewImage({
      urls: [server+'/poster/'+posterUrl],
    })
  },
  // 载入营销课表
  loadMarkets(){
    var that=this
    wx.request({
      url: server+'/market/publish',
      success(res){
        that.setData({
          markets:res.data.ext.markets
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
  // 发布营销课
  publishMarket(e){
    var that=this
    var index=e.currentTarget.dataset.index
    var marketId=e.currentTarget.dataset.marketid
    wx.request({
      url: server+'/market',
      method:'PUT',
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        marketId:marketId
      },
      success(){
        var isReleased=that.data.markets[index].isReleased
        if(isReleased==0){
          that.setData({
            ['markets['+index+'].isReleased']:1
          })
        }else{
          that.setData({
            ['markets['+index+'].isReleased']:0
          })
        } 
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
  // 删除营销课
  deleteMarket(e){
    var that=this
    var index=e.currentTarget.dataset.index
    var marketId=e.currentTarget.dataset.marketid
    wx.showModal({
      title:'提示',
      content:'您将删除该门营销课',
      success(res){
        if(res.confirm){
          wx.request({
            url: server+'/market',
            method:'DELETE',
            header:{
              'content-type': 'application/x-www-form-urlencoded'
            },
            data:{
              marketId:marketId
            },
            success(){
              var markets=that.data.markets
              markets.splice(index,1)
              that.setData({
                markets:markets
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
        }
      }
    })    
  },
  /**
   * 页面的初始数据
   */
  data: {
    markets:[],
    server:server
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMarkets()
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