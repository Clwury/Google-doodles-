// pages/pickdoodle/pickdoodle.js
//获取应用实例
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    //pickdate: '',
    //pickdoodle: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

    console.log(options.pickdate);
    var year = options.pickdate.slice(0, 4);
    if (options.pickdate.slice(4, 6) == '-0'){
      var month = options.pickdate.slice(6, 7);
    }else{
      var month = options.pickdate.slice(5, 7);
    }
    if (options.pickdate.slice(7, 9) == '-0') {
      var date = options.pickdate.slice(9);
    } else {
      var date = options.pickdate.slice(8);
    }
    var pickdate = year+'年'+month+'月'+date+'日';
    that.setData({
      width: app.globalData.width,
      height: app.globalData.height,
      pickdate: pickdate
    })
    wx.request({
      url: 'https://www.senlear.com/pickdate.php',
      method: 'GET',
      data: {
        pickdate: options.pickdate
      },
      success(res) {
        console.log(res.data.pickdoodle);
        that.setData({
          pickdoodle: res.data.pickdoodle
        })
      }
    })
  },
  pickClick: function(event) {
    var idx = event.currentTarget.id;
    console.log(idx);
    var id = this.data.pickdoodle[idx].id;
    console.log(id);
    wx.navigateTo({
      url: '../doodlecontent/doodlecontent?id=' + id
    })
  },
  glideup: function() {
    var glideAnimation = wx.createAnimation({
      duration: 1000,
      timingFunction: "ease",
      delay: 0
    })
    glideAnimation.translateY(-(app.globalData.height)).opacity(1).step()
    this.setData({
      glideAnimation: glideAnimation.export()
    })
  },
  voidglideup: function () {
    var voidglideAnimation = wx.createAnimation({
      duration: 1000,
      timingFunction: "ease",
      delay: 0
    })
    voidglideAnimation.translateY(-(app.globalData.height-60)).opacity(1).step()
    this.setData({
      voidglideAnimation: voidglideAnimation.export()
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
    setTimeout(function(){this.glideup()}.bind(this),800);
    setTimeout(function () { this.voidglideup() }.bind(this), 800);
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