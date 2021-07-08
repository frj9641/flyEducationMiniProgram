// pages/customer/question/question.js
var app=getApp()
var server=app.globalData.server
Page({
  preview(){
    var photoUrl=this.data.photoUrl
    var preview=[]
    for(var i=0;i<photoUrl.length;i++){
      preview.push(server+'/score/'+photoUrl[i])
    }
    wx.previewImage({
      urls: preview
    }) 
  },
  // 载入作业
  loadHomework(){
    var that=this
    wx.request({
      url: server+'/score/mark?scoreId='+this.data.scoreId,
      success(res){
        that.setData({
          word:res.data.ext.score.word,
          photoUrl:res.data.ext.score.photoUrl
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
  // 批改
  doMark(){
    this.setData({
      dialog1: true
  });
  },
  // 半屏框关闭
  close() {
    this.setData({
        dialog1: false,
    });
  },
  // 评价提交
  markSubmit(res){
    var mark=res.detail.value.mark
    var that=this.data
    if(mark){
      wx.request({
        url: server+'/score/mark',
        method:'PUT',
        header:{
          'content-type': 'application/x-www-form-urlencoded'
        },
        data:{
          scoreId:that.scoreId,
          mark:mark
        },
        success(){
          wx.navigateBack({
            complete: () => {
              wx.showModal({
                title:'提示',
                content:'评价成功！',
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
        content:'评价不能为空！',
        showCancel:false,
        cancelColor: 'cancelColor',
      })
    } 
  },
  /**
   * 页面的初始数据
   */
  data: {
    dialog1:'',
    scoreId:'',
    word:'',
    photoUrl:'',
    server:server,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      scoreId:options.scoreId
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