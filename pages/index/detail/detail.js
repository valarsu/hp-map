// pages/map/detail/detail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    system: wx.getStorageSync('system'),
    model: wx.getStorageSync('model')
  },
  doMark(e) {
    var that = this
    var params = e.target.dataset
    wx.request({
      url: 'https://appleta.kelong.cn.com/mapapi.php',
      method: 'GET',
      data: {
        level: 'like',
        id: params.id,
        like: params.type,
        system: that.data.system,
        model: that.data.model,
        gender: that.data.userInfo.gender,
        nickName: that.data.userInfo.nickName
      },
      dataType: 'json',
      success: function (res) {
        wx.navigateBack({
          delta: 1
        })
      },
      fail: function ({ errMsg }) {
        console.log('请求失败: ', errMsg)
      }
    })
  },
  getBuildInfo(id) {
    var that = this
    wx.request({
      url: 'https://appleta.kelong.cn.com/mapapi.php',
      method: 'GET',
      data: {
        level: 'info',
        id: id
      },
      dataType: 'json',
      success: function (res) {
        var buildingInfo = res.data[1]
        buildingInfo.junjia = buildingInfo.junjia === null ? '暂无均价' : (Math.round(buildingInfo.junjia) + '元/㎡')
        if (buildingInfo.name.indexOf('&mdash;') > -1) {
          console.log(buildingInfo.name)          
          buildingInfo.name = buildingInfo.name.replace(/&mdash;/, '—')
          console.log(buildingInfo.name)
        }
        buildingInfo.like = res.data.like
        buildingInfo.nolike = res.data.nolike
        that.setData({
          buildingInfo: buildingInfo
        })
      },
      fail: function ({ errMsg }) {
        console.log('请求失败: ', errMsg)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo,
        buildId: options.id
      })
      console.log(userInfo)
    })
    that.getBuildInfo(options.id)
  },

  onShareAppMessage: function (e) {
    var that = this
    console.log(that.data.buildingInfo)
    return {
      title: that.data.buildingInfo.name,
      path: `/pages/index/detail/detail?id=${that.data.buildId}`,
      success: function (res) {
        console.log(`/pages/index/detail/detail?id=${that.data.buildId}`)
      }
    }
  }
})