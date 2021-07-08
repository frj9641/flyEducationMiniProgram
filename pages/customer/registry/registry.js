// pages/registry/registry.js
var app=getApp()
var server=app.globalData.server
Page({
  // 客户表单提交
  informationSubmit(res){
    this.setData({
      submit:1
    })
    var that=this.data
    var inf=res.detail.value
    if(inf.studentName&&inf.parentName&&inf.school&&that.grade&&inf.phone){
      wx.request({
        url: server+'/customer/',
        method:'POST',
        header:{
          'content-type': 'application/x-www-form-urlencoded'
        },
        data:{
          customerUnionid:app.globalData.userUnionid,
          studentName:inf.studentName,
          parentName:inf.parentName,
          school:inf.school,
          grade:parseInt(that.grade)+1,
          phone:inf.phone,
          marketId:that.marketId
        },
        success(){
          wx.navigateBack({
            delta:2,
            complete: () => {
              wx.showModal({
                title:'提示',
                content:'提交成功，稍后会有工作人员联系您！',
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
      this.setData({
        submit:0
      })
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

  /**
   * 页面的初始数据
   */
  data: {
    grades:['一年级','二年级','三年级','四年级','五年级','六年级',
    '初一','初二','初三','高一','高二','高三',],
    grade:'',
    marketId:'',
    submit:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      marketId:options.marketId
    })
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