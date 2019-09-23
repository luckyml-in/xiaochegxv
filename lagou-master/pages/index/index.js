//index.js
//获取应用实例
var http = require('../../utils/http.js')
const app = getApp()

Page({
  data: {
    pageNo: 1,
    showBtn: false, // 默认不显示加载更多按钮
    isLoading: false, // 请求状态
    positionList: []
  },
  //事件处理函数
  gotoCustomInfo: function () {
    app.navTo('customInfo')
  },

  /**
   * 查看职位详情
   */
  viewPositionDetail: (e) => {
    app.navTo('positionDetail', {positionId: e.currentTarget.dataset.pid})
  },

  /**
   * 加载更多
   *
   */
  loadMore() {
    this.loadData(this.data.pageNo + 1)
  },
  //图片宽高大于屏幕宽高
  imageLoad: function (e) {
    var imageSize = this.imageUtil(e)
    this.setData({
      imagewidth: imageSize.imageWidth,
      imageheight: imageSize.imageHeight
    })
  },
  imageUtil: function (e) {
    var imageSize = {};
    var originalWidth = e.detail.width; // 图片原始宽
    var originalHeight = e.detail.height; // 图片原始高
    var originalScale = originalHeight / originalWidth; //图片高宽比
    //获取屏幕宽高
    wx.getSystemInfo({
      success: function (res) {
        var windowWidth = res.windowWidth;
        var windowHeight = res.windowHeight;
        var windowscale = windowHeight / windowWidth;//屏幕高宽比
        if (originalScale < windowscale) { // 图片高宽比小于屏幕高宽比
          //图片缩放后的宽为屏幕宽
          imageSize.imageWidth = windowWidth;
          imageSize.imageHeight = (windowWidth * originalHeight) / originalWidth;
        } else { // 图片高宽比大于屏幕高宽比
          //图片缩放后的高为屏幕高
          imageSize.imageHeight = windowHeight;
          imageSize.imageWidth = (windowHeight * originalWidth) / originalHeight;
        }
      }
    })
    return imageSize;
  },
  /**
   * 通用请求数据函数
   *
   * @param {Number} pageNo 自定义的页码请求
   */
  loadData(pageNo) {
    var that = this;
    wx.request({
      url: 'http://localhost:9090/lfj/articleController/listArticle', //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data[0])
        that.setData({
          positionList: res.data
        })
      }
    });
  },
  onLoad: function () {
    this.loadData()
  }
})
