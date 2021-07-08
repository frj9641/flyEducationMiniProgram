// pages/market/market.js
var app=getApp()
var server=app.globalData.server
Page({
  // 上传照片
  choosePoster:function(){
    var that = this
    wx.chooseImage({
     count: 5,
     success: function (res) {
      that.setData({
       tempFilePath: res.tempFilePaths
      })
     },
     fail(){
      wx.showModal({
        title:'提示',
        content:'图片不符合规格',
        showCancel:false,
        cancelColor: 'cancelColor',
      })
     }
    })
  },
  // 作业表单提交
  homeworkSubmit(res){
    this.setData({
      submit:1
    })
    var that=this.data
    var inf=res.detail.value
    if(inf.word==''&&that.tempFilePath==''){
      this.setData({
        submit:0
      })
      wx.showModal({
        title:'提示',
        content:'作业文字和作业图片不能都为空',
        showCancel:false,
        cancelColor: 'cancelColor',
      })
    }else{
      if(that.tempFilePath!=''){
        // 上传图片
        for(var i=0;i<that.tempFilePath.length;i++){
          wx.uploadFile({
            filePath: that.tempFilePath[i],
            name: 'photo',
            url: server+'/homework/photo',
            fail(res){
              console.log(res)
              wx.showModal({
                title:'提示',
                content:'上传作业图片失败',
                showCancel:false,
                cancelColor: 'cancelColor',
              })
            },
          })
        }  
      }
      for(var i=0;i<that.tempFilePath.length;i++){
        that.tempFilePath[i]=that.tempFilePath[i].substring(9)
      }
      // 上传文字
      wx.request({
        url: server+'/homework',
        method:'POST',
        header:{
          'content-type': 'application/x-www-form-urlencoded'
        },
        data:{
          classId:that.classId,
          word:inf.word,
          photoUrl:that.tempFilePath
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
            content:'上传作业文字失败！',
            showCancel:false,
            cancelColor: 'cancelColor',
          })
        } 
      })
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    tempFilePath:'',
    classId:'',
    submit:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      classId:options.classId
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