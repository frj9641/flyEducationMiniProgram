//app.js
App({
  // 用户启动小程序时获取其openid
  getUserOpenId(){
    wx.login({
      complete: (res) => {
        console.log('jsCode：'+res.code)
        var jsCode=res.code
        var that=this
        wx.request({
          url: this.globalData.server+'/userInfo?jsCode='+jsCode,
          success(res){
            console.log('收到后台返回：'+res.data.ext.duty)
            var unionid=res.data.ext.info.unionid
            if(unionid!=null){
              that.globalData.userOpenid=res.data.ext.info.openid
              that.globalData.userUnionid=res.data.ext.info.unionid
              that.globalData.duty=res.data.ext.duty
              // 解决异步
              if(that.dutyCallback){
                that.dutyCallback(res.data.ext.duty)
              }
            }else{
              that.globalData.session_key=res.data.ext.info.session_key
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
    })
  },
  globalData: {
    session_key:'',
    userOpenid:'',
    userUnionid:'',
    duty:'',
    server:'xxx',
  },
  onLaunch(){
    this.getUserOpenId()
  }
})