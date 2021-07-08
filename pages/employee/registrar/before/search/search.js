var app=getApp()
var server=app.globalData.server
Page({
  data: {
      customers:[],
      inputShowed: false,
      inputVal: ""
  },
  // 老客户新增订单
  addOrder(e){
    var customerId=e.currentTarget.dataset.customerid
    wx.navigateTo({
      url: '../customize/customize?customerId='+customerId,
    })
  },
  showInput: function () {
      this.setData({
          inputShowed: true
      });
  },
  search: function (e) {
    var keyword=this.data.inputVal
    var that=this
    wx.request({
      url: server+'/customer/search?keyword='+keyword,
      success(res){
        that.setData({
          customers:res.data.ext.customers
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
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  }
});