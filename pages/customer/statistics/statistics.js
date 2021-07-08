var wxCharts = require('../../../utils/wxcharts-min.js')
var app = getApp()
var server=app.globalData.server
var lineChart = null
Page({
  loadStatistics(){
    var that=this
    wx.request({
      url: server+'/sign/statistics?studentId='+this.data.studentId,
      success(res){
        that.setData({
          signs:res.data.ext.signs,
          scores:res.data.ext.scores
        }),
        // that.loadCharts()
        that.loadSigns()
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

  // touchHandler: function (e) {
  //   lineChart.showToolTip(e, {
  //       // background: '#7cb5ec',
  //       format: function (item, category) {
  //           return category + ' ' + item.name + ':' + item.data 
  //       }
  //   });
  // },    
  // loadCharts(){
  //   var scores=this.data.scores
  //   var windowWidth = 320;
  //   try {
  //       var res = wx.getSystemInfoSync();
  //       windowWidth = res.windowWidth;
  //   } catch (e) {
  //       console.error('getSystemInfoSync failed!');
  //   }
  //   lineChart = new wxCharts({
  //     canvasId: 'lineCanvas',
  //     type: 'line',
  //     categories: scores.map(function(v){return v.date}),
  //     animation: true,
  //     // background: '#f5f5f5',
  //     series: [{
  //       name: '成绩',
  //       data: scores.map(function(v){return v.mark}),
  //     }],
  //     xAxis: {
  //       disableGrid: true
  //     },
  //     yAxis: {
  //       title: '分数',
  //       min: 0
  //     },
  //     width: windowWidth,
  //     height: 150,
  //     dataLabel: false,
  //     dataPointShape: true,
  //     extra: {
  //       lineStyle: 'curve'
  //     }
  //   });
  // },

  loadSigns(){
    var t=this
    var that=this.data
    var signs=this.data.signs
    for(var i=0;i<signs.length;i++){
      if(signs[i].mark==1){
        t.setData({
          signin:++that.signin
        })
      }else if(signs[i].mark==2){
        t.setData({
          belate:++that.belate
        })
      }else{
        t.setData({
          absent:++that.absent
        })
      }
    }
  },
  data: {
    studentId:'',
    signs:[],
    scores:[],
    signin:0,
    belate:0,
    absent:0
  },
  onLoad: function (e) {
    this.setData({
      studentId:e.studentId
    })
    this.loadStatistics()
  },
});