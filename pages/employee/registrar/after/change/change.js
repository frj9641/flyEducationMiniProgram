var app=getApp()
var server=app.globalData.server
Page({
  bindStartHourChange(res){
    this.setData({
      startHour:this.data.hour[res.detail.value]
    })
  },
  bindStartMinuteChange(res){
    var minute=this.data.hour[res.detail.value]
    if(minute.toString().length<2){
      minute='0'+minute
    }
    this.setData({
      startMinute:minute
    })
  },
  bindEndHourChange(res){
    this.setData({
      endHour:this.data.hour[res.detail.value]
    })
  },
  bindEndMinuteChange(res){
    var minute=this.data.hour[res.detail.value]
    if(minute.toString().length<2){
      minute='0'+minute
    }
    this.setData({
      endMinute:minute
    })
  },
  data: {
    submit:0,
    year: 0,
    month: 0,
    date: ['日', '一', '二', '三', '四', '五', '六'],
    dateArr: [],
    isToday: 0,
    isTodayWeek: false,
    todayIndex: 0,
    classId:'',
    selectDay:'',
    classDate:[],
    startChange:0,
    oldDay:'',
    newDay:'',
    hour:[],
    minute:[],
    startHour:'',
    startMinute:'',
    endHour:'',
    endMinute:''
  },
  // 修改完成
  changeDate(){
    this.setData({
      submit:1
    })
    var that=this.data
    var oldDay=this.data.oldDay
    var newDay=this.data.newDay
    if(oldDay!=''&&newDay!=''&&that.startHour!==''&&that.startMinute!=''&&that.endHour!==''&&that.endMinute!=''){
      // 修改课程时间
      wx.request({
        url: server+'/classDate',
        method:'PUT',
        header:{
          'content-type': 'application/x-www-form-urlencoded'
        },
        data:{
          newDay:newDay,
          oldDay:oldDay,
          classId:this.data.classId,
          startHour:that.startHour,
          startMinute:that.startMinute,
          endHour:that.endHour,
          endMinute:that.endMinute
        },
        success(res){
          wx.navigateBack({
            complete: () => {
              wx.showModal({
                title:'提示',
                content:res.data.ext.result,
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
      this.setData({
        submit:0
      })
      wx.showModal({
        title:'提示',
        content:'请选择上课日期与起止时间！',
        showCancel:false,
        cancelColor: 'cancelColor',
      })
    } 
  },
  // 开始修改
  startChange(){
    var selectDay=this.data.selectDay
    var classDate=this.data.classDate
    var index=classDate.indexOf(selectDay)
    classDate.splice(index,1)
    this.setData({
      oldDay:selectDay,
      classDate:classDate,
      startChange:1
    })
  },
  // 加课
  addClassDate(){
    this.setData({
      submit:1
    })
    var that=this.data
    var selectDay=this.data.selectDay
    if(selectDay!=''&&that.startHour!==''&&that.startMinute!=''&&that.endHour!==''&&that.endMinute!=''){
      wx.request({
        url: server+'/classDate/reminder',
        method:'POST',
        header:{
          'content-type': 'application/x-www-form-urlencoded'
        },
        data:{
          classId:that.classId,
          dates:selectDay,
          startHour:that.startHour,
          startMinute:that.startMinute,
          endHour:that.endHour,
          endMinute:that.endMinute
        },
        success(res){
          wx.navigateBack({
            complete: () => {
              wx.showModal({
                title:'提示',
                content:res.data.ext.result,
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
      this.setData({
        submit:0
      })
      wx.showModal({
        title:'提示',
        content:'请选择上课日期与起止时间！',
        showCancel:false,
        cancelColor: 'cancelColor',
      })
    }
  },
  // 日期选取事件
  calendarTap(e){
    var startChange=this.data.startChange
    var date=e.currentTarget.dataset.datenum
    var month=e.currentTarget.dataset.month
    var year=e.currentTarget.dataset.year
    if(month<10){
      month='0'+month
    }
    if(date<10){
      date='0'+date
    }
    var day=year+'-'+month+'-'+date
    if(startChange==0){
      var selectDay=this.data.selectDay
      // 烧脑
      if(selectDay!=day){
        this.setData({
          selectDay:day
        })
      } else{
        this.setData({
          selectDay:''
        })
      }
    }else{
      this.setData({
        selectDay:day,
        newDay:day
      })
    }
  },
  // 载入课程时间
  loadClassDate(){
    var classId=this.data.classId
    var that=this
    wx.request({
      url: server+'/classDate?classId='+classId,
      success(res){
        that.setData({
          classDate:res.data.ext.dates
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
  onLoad: function (options) {
    this.setData({
      classId:options.classId,
    })
    this.loadClassDate()
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    this.dateInit();
    this.setData({
      year: year,
      month: month,
      isToday: '' + year + month + now.getDate(),
    })
    for(var i=0;i<24;i++){
      this.data.hour.push(i)
    }
    for(var i=0;i<60;i++){
      this.data.minute.push(i)
    }
    this.setData({
      hour:this.data.hour,
      minute:this.data.minute
    })
  },
  dateInit: function (setYear, setMonth) {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let dateArr = [];                       //需要遍历的日历数组数据
    let arrLen = 0;                         //dateArr的数组长度
    let now = setYear ? new Date(setYear, setMonth) : new Date();
    let year = setYear || now.getFullYear();
    let nextYear = 0;
    let month = setMonth || now.getMonth();                 //没有+1方便后面计算当月总天数
    let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
    let startWeek = new Date(year + '/' + (month + 1) + '/' + 1).getDay();                          //目标月1号对应的星期
    let dayNums = new Date(year, nextMonth, 0).getDate();               //获取目标月有多少天
    let obj = {};
    let num = 0;
    if (month + 1 > 11) {
      nextYear = year + 1;
      dayNums = new Date(nextYear, nextMonth, 0).getDate();
    }
    arrLen = startWeek + dayNums;
    for (let i = 0; i < arrLen; i++) {
      if (i >= startWeek) {
        num = i - startWeek + 1;
        var trueMonth=month+1
        if(trueMonth<10){
          trueMonth='0'+trueMonth
        }
        var showNum=num
        if(num<10){
          num='0'+num
        }
        obj = {
          isToday: year + '-' + trueMonth + '-' + num,
          dateNum: showNum,
          weight: 5
        }
      } else {
        obj = {};
      }
      dateArr[i] = obj;
    }
    this.setData({
      dateArr: dateArr
    })
    let nowDate = new Date();
    let nowYear = nowDate.getFullYear();
    let nowMonth = nowDate.getMonth() + 1;
    let nowWeek = nowDate.getDay();
    let getYear = setYear || nowYear;
    let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;
    if (nowYear == getYear && nowMonth == getMonth) {
      this.setData({
        isTodayWeek: true,
        todayIndex: nowWeek
      })
    } else {
      this.setData({
        isTodayWeek: false,
        todayIndex: -1
      })
    }
  },
  /**
   * 上月切换
   */
  lastMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
    let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.dateInit(year, month);
  },
  /**
   * 下月切换
   */
  nextMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
    let month = this.data.month > 11 ? 0 : this.data.month;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.dateInit(year, month);
  }
})