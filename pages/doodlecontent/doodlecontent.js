// pages/doodlecontent/doodlecontent.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    doodlecontent: {
      contentImg: false,
      zh_cn_content: "",
      id: ""
      /*en_content: "",
      high_res_url: "http://127.0.0.1/Google Doodles/2019.7/2019.7.14/fathers-day-2019-uruguay-6013295789080576-2xa.gif",
      id: "4161",
      run_date_array: "2019-07-14",
      title: "2019 年父亲节（乌拉圭）",
      zh_cn_content: ""*/
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.id);
    var _this = this;
    wx.request({
      url: 'https://www.senlear.com/doodleContent.php',
      method: 'GET',
      data: {
        id: options.id
      },
      success(res) {
        console.log(res.data);
        if ((res.data.zh_cn_content.match(/\n\r\n/g)) == null) {
          res.data.zh_cn_content = res.data.zh_cn_content.replace(/\n/g, '\n\n');
        }


        _this.setData({
          doodlecontent: res.data
        });
        console.log(_this.data.doodlecontent);
        console.log(_this.data.doodlecontent.zh_cn_content);
      }
    })
  },
  clickLeft: function() {
    var _this = this;
    wx.request({
      url: 'https://www.senlear.com/clickLeft.php',
      method: 'GET',
      data: {
        id: _this.data.doodlecontent.id,
        direction: "left"
      },
      success(res) {
        console.log(res.data);
        if (res.data.id != "") {
          if ((res.data.zh_cn_content.match(/\n\r\n/g)) == null) {
            res.data.zh_cn_content = res.data.zh_cn_content.replace(/\n/g, '\n\n');
          }

          _this.setData({
            doodlecontent: res.data
          });
          console.log(_this.data.doodlecontent);
          console.log(_this.data.doodlecontent.zh_cn_content);
        }
      }
    })
  },
  clickRight: function() {
    var _this = this;
    wx.request({
      url: 'https://www.senlear.com/clickLeft.php',
      method: 'GET',
      data: {
        id: _this.data.doodlecontent.id,
        direction: "right"
      },
      success(res) {
        console.log(res.data);
        if (res.data.id != "") {
          if ((res.data.zh_cn_content.match(/\n\r\n/g)) == null) {
            res.data.zh_cn_content = res.data.zh_cn_content.replace(/\n/g, '\n\n');
          }

          _this.setData({
            doodlecontent: res.data
          });
          console.log(_this.data.doodlecontent);
          console.log(_this.data.doodlecontent.zh_cn_content);
        }
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