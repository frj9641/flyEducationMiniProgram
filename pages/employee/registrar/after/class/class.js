// pages/employee/employee.js
var util=require('../../../../../utils/util')
var app=getApp()
var server=app.globalData.server
Page({
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
      teacherUnionid:this.data.teachers[no].employeeUnionid
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
  // 营销课表单提交
  classSubmit(res){
    var that=this.data
    var result=res.detail.value
    if(result.className&&that.subject&&that.registrarName&&that.teacherName){
      wx.request({
        url: server+'/classInfo',
        method:'POST',
        header:{
          'content-type': 'application/x-www-form-urlencoded'
        },
        data:{
          className:result.className,
          subject:that.subject,
          teacherName:that.teacherName,
          teacherUnionid:that.teacherUnionid,
          registrarName:that.registrarName,
          registrarUnionid:that.registrarUnionid,
        },
        success(){
          wx.navigateBack({
            complete: () => {
              wx.showModal({
                title:'提示',
                content:'提交成功！',
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
  /**
   * 页面的初始数据
   */
  data: {
    subjects:['编程','英语','数学','语文','物理',
    '化学','生物','地理','历史','政治'],
    subject:'',
    teachers:[],
    teacherName:'',
    teacherUnionid:'',
    registrars:[],
    registrarName:'',
    registrarUnionid:'',
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