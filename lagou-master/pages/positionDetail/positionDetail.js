// pages/positionDetail/positionDetail.js
var http = require('../../utils/http')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    positionName: '', // 职位名称
    haveCollect: '', // 是否已收藏
    salary: '', // 薪水
    positionAddress: '', // 地址
    jobNature: '', // 职位类型
    workYear: '', // 工作年龄
    education: '', // 文化要求
    advantage: '', // 职位诱惑
    companyLogo: '', // 公司logo
    companyShortName: '', // 公司名称
    positionDesc: '', // 职位描述
    page: '', // 评价相关信息
  },

  /**
   * 查看公司详细招聘信息
   */
  viewCompanyDetail: () => {
    app.navTo('companyDetail')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    http(app.apiName.positionDetail.replace('positionId', options.positionId)).then(res => {
      let tempData = {} // 临时的页面数据对象，用于一次性的使用setData函数，提高性能
      tempData.positionName = res.data.content.positionName
      tempData.haveCollect = res.data.content.haveCollect
      tempData.salary = res.data.content.salary
      tempData.positionAddress = res.data.content.positionAddress
      tempData.jobNature = res.data.content.jobNature
      tempData.workYear = res.data.content.workYear
      tempData.education = res.data.content.education

      tempData.advantage = res.data.content.advantage
      tempData.companyShortName = res.data.content.companyShortName

      // 处理公司logo
      tempData.companyLogo = res.data.content.companyLogo
      tempData.companyLogo = 'https:' + tempData.companyLogo.substring(tempData.companyLogo.indexOf("//") + 1, tempData.companyLogo.length)

      // 处理职位描述
      let descs = []
      tempData.positionDesc = res.data.content.positionDesc
      tempData.positionDesc.replace(/<p>(.*)<\/p>/ig, function(){
        let args = arguments
        if (/<br>/.test(args[1])) return // 过滤换行
        descs.push(args[1])
      })
      tempData.positionDesc = descs

      // 处理评价列表
      tempData.page = JSON.parse(res.data.content.page)
      for (let item of tempData.page.result) {
        let time = new Date(item.createTime)
        item.createTime = `${time.getFullYear()}/${time.getMonth() + 1 > 9 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1)}/${time.getDate() > 9 ? time.getDate() : '0' + time.getDate()}`
        item.companyScore = parseInt(item.companyScore)
        item.comprehensiveScore = parseInt(item.comprehensiveScore)
        item.describeScore = parseInt(item.describeScore)
        item.interviewerScore = parseInt(item.interviewerScore)
      }
      this.setData(tempData)
    })
  }
})
