// pages/doodle/doodle.js
const util = require('../../utils/util.js')
//获取应用实例
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    //baseurl: 'http://127.0.0.1/',
    newdoodle: [],
    recentdoodle: [],
    historydoodle: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    find: "findClick",
    height: "",
    width: ""
  },
  //点击事件
  handleClick: function(event) {
    var idx = event.currentTarget.id;
    console.log(idx);
    var id = this.data.newdoodle[idx].id;
    console.log(id);
    wx.navigateTo({
      url: '../doodlecontent/doodlecontent?id=' + id
    })
    //缩回find
    if(this.data.find != "findClick"){
      this.findClick1();
    }
  },
  onClick: function(event) {
    var idx = event.currentTarget.id;
    console.log(idx);
    var id = this.data.recentdoodle[idx].id;
    console.log(id);
    wx.navigateTo({
      url: '../doodlecontent/doodlecontent?id=' + id
    })
    //缩回find
    if (this.data.find != "findClick") {
      this.findClick1();
    }
  },
  historyClick: function(event) {
    var idx = event.currentTarget.id;
    console.log(idx);
    var id = this.data.historydoodle[idx].id;
    console.log(id);
    wx.navigateTo({
      url: '../doodlecontent/doodlecontent?id=' + id
    })
    //缩回find
    if (this.data.find != "findClick") {
      this.findClick1();
    }
  },
  //find点击动画
  findClick: function() {
    //findimg动画
    var findAnimation = wx.createAnimation({
      duration: 300,
      timingFunction: "ease",
      delay: 0
    })
    findAnimation.rotate(360).step()
    this.setData({
      find: "findClick1",
      findAnimation: findAnimation.export()
    })
    //aimimg动画
    var aimAnimation = wx.createAnimation({
      duration: 300,
      timingFunction: "ease-in-out",
      delay: 0
    })
    aimAnimation.bottom(115).step()
    this.setData({
      aimAnimation: aimAnimation.export()
    })
    //sendimg动画
    var sendAnimation = wx.createAnimation({
      duration: 300,
      timingFunction: "ease-in-out",
      delay: 0
    })
    sendAnimation.bottom(60).step()
    this.setData({
      sendAnimation: sendAnimation.export()
    })
  },
  //逆转
  findClick1: function () {
    //findimg动画
    var findAnimation = wx.createAnimation({
      duration: 300,
      timingFunction: "ease",
      delay: 0
    })
    findAnimation.rotate(-360).step()
    this.setData({
      find: "findClick",
      findAnimation: findAnimation.export()
    })
    //aimimg动画
    var aimAnimation = wx.createAnimation({
      duration: 300,
      timingFunction: "ease-in-out",
      delay: 0
    })
    aimAnimation.bottom(0).step()
    this.setData({
      aimAnimation: aimAnimation.export()
    })
    //sendimg动画
    var sendAnimation = wx.createAnimation({
      duration: 300,
      timingFunction: "ease-in-out",
      delay: 0
    })
    sendAnimation.bottom(0).step()
    this.setData({
      sendAnimation: sendAnimation.export()
    })
  },
  //日期选择
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    wx.navigateTo({
      url: '../pickdoodle/pickdoodle?pickdate=' + e.detail.value
    })
    this.findClick1();
    this.setData({
      pickdate: e.detail.value
    })
  },
  randomgoogle: function() {
    var max = this.data.allnumber+1;
    var random = Math.floor(Math.random() * (max- 1)) + 1;
    console.log(random);
    wx.showLoading({
      title: 'To one day',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1500)
    setTimeout(function () {
      wx.navigateTo({
      url: '../doodlecontent/doodlecontent?id=' + random
    })} , 800)
    this.findClick1();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    this.setData({
      width: app.globalData.width,
      height: app.globalData.height
    })
    console.log(util.formatTime(new Date()));
    wx.request({
      url: 'https://www.senlear.com/index.php',
      method: 'GET',
      data: {
        nowdate: util.formatTime(new Date())
      },
      success(res) {
        var newdoodle = [];
        var recentdoodle = [];
        var historydoodle = [];
        var i;
        console.log(res.data);
        //console.log(res.data.newdoodle);
        var doodledata = res.data.newdoodle;
        for (i in doodledata) {
          var doodleitem = {};
          doodleitem["id"] = doodledata[i].id;
          doodleitem["title"] = doodledata[i].title;
          doodleitem["run_date_array"] = doodledata[i].run_date_array;
          doodleitem["url"] = doodledata[i].url;

          newdoodle.push(doodleitem);
          //console.log(newdoodle);
          if (i == 4) {
            break;
          }
        }
        for (i in doodledata) {
          if (i <= 4) {
            continue;
          }
          var doodleitem = {};
          doodleitem["id"] = doodledata[i].id;
          doodleitem["run_date_array"] = doodledata[i].run_date_array;
          doodleitem["url"] = doodledata[i].url;

          recentdoodle.push(doodleitem);
          //console.log(newdoodle);
          if (i == 9){
            break;
          }
        }
        for (i in doodledata) {
          if (i <= 9) {
            continue;
          }
          var doodleitem = {};
          doodleitem["id"] = doodledata[i].id;
          doodleitem["run_date_array"] = doodledata[i].run_date_array;
          doodleitem["url"] = doodledata[i].url;

          historydoodle.push(doodleitem);
          //console.log(newdoodle);
        }

        _this.setData({
          newdoodle: newdoodle,
          recentdoodle: recentdoodle,
          historydoodle: historydoodle,
          allnumber: res.data.allnumber
        })
        console.log(newdoodle);
        console.log(recentdoodle);
        console.log(historydoodle);
        console.log(_this.data.allnumber);
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})