// pages/search/search.js
Page({
  dayClick: function (event) {
    console.log(event.detail.day);
    var that = this;
    var positionList;
    wx.request({
      url: 'http://localhost:9090/lfj/articleController/listArticle', //仅为示例，并非真实的接口地址
      data: {
        date:event.detail.day
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data[0])
        that.setData({
          articleList: res.data
        })
      }
    });
    // console.log(positionList);
  },

  /**
   * 页面的初始数据
   */
  data: {
    articleList:[],
    dateList: [],
    
    dayStyle: [
      { month: 'current', day: new Date().getDate(), color: 'white', background: '#AAD4F5' },
      { month: 'current', day: new Date().getDate(), color: 'white', background: '#AAD4F5' }
    ]
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var dateList;
    wx.request({
      url: 'http://localhost:9090/lfj/schoolRecruitment/listSchoolRecruitmentDates', //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          dateList: res.data,
          for(dateList){
            
          }
        })
      },
    });
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
  
  },

  goto : function () {
    wx.navigateTo({
      //新注册一个承载跳转的页面
      url: '/pages/goto/goto',

    })
  }
})