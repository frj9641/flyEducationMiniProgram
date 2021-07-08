// pages/registry/registry.js
var app=getApp()
var server=app.globalData.server
Page({
  // 客户表单提交
  informationSubmit(res){
    var that=this.data
    var inf=res.detail.value
    if(inf.studentName&&inf.parentName&&inf.school&&inf.phone&&that.grade&&that.marketName){
      wx.request({
        url: server+'/order/customize',
        method:'POST',
        header:{
          'content-type': 'application/x-www-form-urlencoded'
        },
        data:{
          customerUnionid:that.customerUnionid,
          studentName:inf.studentName,
          parentName:inf.parentName,
          school:inf.school,
          grade:parseInt(that.grade)+1,
          phone:inf.phone,
          registrarUnionid:that.registrarUnionid,
          marketId:that.marketId
        },
        success(){
          wx.navigateBack({
            complete: () => {
              wx.showModal({
                title:'提示',
                content:'添加订单成功！',
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
        content:'请填写完整资料',
        showCancel:false,
        cancelColor: 'cancelColor',
      })
    }
    
  },
  // 年级下拉框
  bindGradeChange(res){
    this.setData({
      grade:res.detail.value
    })
  },
  //营销课程下拉框
  bindMarketChange(res){
    var no=res.detail.value
    this.setData({
      marketName:this.data.markets[no].marketName,
      marketId:this.data.markets[no].marketId,
      registrarUnionid:this.data.markets[no].registrarUnionid
    })
  },
  //载入用户信息与营销课表
  loadCustomerAndMarkets(){
    var that=this
    wx.request({
      url: server+'/customer/customize',
      method:'POST',
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        registrarUnionid:app.globalData.userUnionid,
        customerId:that.data.customerId
      },
      success(res){
        var ext=res.data.ext
        that.setData({
          markets:ext.markets,
          customerUnionid:ext.customer.customerUnionid,
          studentName:ext.customer.studentName,
          parentName:ext.customer.parentName,
          school:ext.customer.school,
          grade:ext.customer.grade-1,
          phone:ext.customer.phone
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
    grades:['一年级','二年级','三年级','四年级','五年级','六年级',
    '初一','初二','初三','高一','高二','高三',],
    grade:'',
    registrarUnionid:'',
    customerUnionid:'',
    studentName:'',
    parentName:'',
    school:'',
    phone:'',
    markets:[],
    customerId:'',
    marketId:'',
    marketName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      customerId:options.customerId
    })
    this.loadCustomerAndMarkets()
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