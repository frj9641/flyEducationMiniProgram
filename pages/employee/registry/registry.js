// pages/employee/employee.js
var app=getApp()
var server=app.globalData.server
Page({
  // 更改部门下拉框
  bindDepartmentChange(res){
    this.setData({
      department:this.data.departments[res.detail.value]
    })
  },
  bindDutyChange(res){
    this.setData({
      dutyNo:parseInt(res.detail.value)+1,
      duty:this.data.duties[res.detail.value]
    })
  },
  // //修改职能复选框
  // workChange(res){
  //   var work=res.detail.value
  //   if(work.indexOf('1')!=-1){
  //     this.setData({
  //       isManager:1
  //     })
  //   }else{
  //     this.setData({
  //       isManager:0
  //     })
  //   }
  //   if(work.indexOf('2')!=-1){
  //     this.setData({
  //       isRegistrar:1
  //     })
  //   }else{
  //     this.setData({
  //       isRegistrar:0
  //     })
  //   }
  //   if(work.indexOf('3')!=-1){
  //     this.setData({
  //       isTeacher:1
  //     })
  //   }else{
  //     this.setData({
  //       isTeacher:0
  //     })
  //   }
  // },
  //员工信息表单提交
  informationSubmit(res){
    this.setData({
      submit:1
    })
    var that=this.data
    var inf=res.detail.value
    if(inf.employeeName&&inf.phone&&that.department&&that.dutyNo){
      wx.request({
        url: server+'/employee',
        method:'POST',
        header:{
          'content-type': 'application/x-www-form-urlencoded'
        },
        data:{
          employeeUnionid:app.globalData.userUnionid,
          employeeName:inf.employeeName,
          phone:inf.phone,
          department:that.department,
          duty:that.dutyNo
        },
        success(){
          wx.navigateBack({
            complete: () => {
              wx.showModal({
                title:'提示',
                content:'注册成功',
                showCancel:false,
                cancelColor: 'cancelColor',
              })
            },
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
  /**
   * 页面的初始数据
   */
  data: {
    submit:0,
    department:'',
    departments:['博佳教育','飞扬教育'],
    duty:'',
    duties:['老师','教务','管理'],
    dutyNo:''
    // works:[
    //   {name:'1',value:'销售'},
    //   {name:'2',value:'教务'},
    //   {name:'3',value:'老师'}
    // ],
    // isManager:0,
    // isRegistrar:0,
    // isTeacher:0
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