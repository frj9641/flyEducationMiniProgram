// pages/market/market.js
var util=require('../../../../utils/util')
var app=getApp()
var server=app.globalData.server
Page({
  // 选择海报
  choosePoster:function(){
    var that = this
    wx.chooseImage({
     count: 1,
     success: function (res) {
      that.setData({
       tempFilePath: res.tempFilePaths[0]
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
  // 载入所有教务及老师
  loadEmployees(){
    var that=this
    wx.request({
      url: server+'/employee',
      success(res){
        that.setData({
          registrars:res.data.ext.registrars,
          teachers:res.data.ext.teachers
        })
      },
      fail(){
        wx.showModal({
          title:'提示',
          content:'服务器开小差了',
          showCancel:false,
          cancelColor: 'cancelColor',
        })
      }
    })
  },
  // 负责教务下拉框
  bindRegistrarChange(res){
    var no=res.detail.value
    this.setData({
      registrarUnionid:this.data.registrars[no].employeeUnionid,
      registrarName:this.data.registrars[no].employeeName
    })
  },
  // 所属学科下拉框
  bindSubjectChange(res){
    var no=res.detail.value
    this.setData({
      subject:this.data.subjects[no]
    })
  },
  // 任课老师下拉框
  bindTeacherChange(res){
    var no=res.detail.value
    this.setData({
      teacherName:this.data.teachers[no].employeeName,
    })
  },
  // 营销课表单提交
  marketSubmit(res){
    var that=this.data
    var inf=res.detail.value
    var period
    if(!inf.period){
      period=0
    }else{
      period=inf.period
    }
    if(inf.marketName&&inf.introduction&&that.subject&&that.registrarName&&that.teacherName&&inf.price&&that.tempFilePath&&that.is_period){
      wx.request({
        url: server+'/market',
        method:'POST',
        header:{
          'content-type': 'application/x-www-form-urlencoded'
        },
        data:{
          marketName:inf.marketName,
          introduction:inf.introduction,
          subject:that.subject,
          posterUrl:that.tempFilePath.substring(9),
          teacherName:that.teacherName,
          registrarUnionid:that.registrarUnionid,
          registrarName:that.registrarName,
          price:inf.price,
          isPeriod:that.is_period,
          period:period
        },
        success(){
          // 先确认营销课上传成功再上传其海报
          wx.navigateBack({
            complete: () => {
              wx.showModal({
                title:'提示',
                content:'注册完成',
                showCancel:false,
                cancelColor: 'cancelColor',
              })
            },
          })
        },
        fail(){
          wx.showModal({
            title:'提示',
            content:'上传文字失败',
            showCancel:false,
            cancelColor: 'cancelColor',
          })
        }
      })
      wx.uploadFile({
        filePath: that.tempFilePath,
        name: 'poster',
        url: server+'/market/poster',
        fail(){
          wx.showModal({
            title:'提示',
            content:'上传海报失败',
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
  // 单选改变
  radioChange(res){
    this.setData({
      is_period:res.detail.value
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    subjects:['编程','英语','数学','语文','物理',
    '化学','生物','地理','历史','政治'],
    subject:'',
    registrars:[],
    registrarName:'',
    registrarUnionid:'',
    teachers:[],
    teacherName:'',
    tempFilePath:'',
    items: [
      {value: '1', name: '课时'},
      {value: '0', name: '学期'},
    ],
    is_period:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadEmployees()
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