//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})
// "tabBar": {
//   "list": [{
//     "pagePath": "pages/index/index",
//     "text": "首页",
//     "iconPath": "images/icon_guitar.png",
//     "selectedIconPath": "images/icon_guitar_HL.png"
//   }, {
//     "pagePath": "pages/self/self",
//     "text": "自己",
//     "iconPath": "images/icon_head.png",
//     "selectedIconPath": "images/icon_head_HL.png"
//   }, {
//     "pagePath": "pages/map/map",
//     "text": "地图",
//     "iconPath": "/images/location.png",
//     "selectedIconPath": "/images/location.png"
//   }],
//   "color": "#999",
//   "backgroundColor": "#F8F8F8",
//   "borderStyle": "black",
//   "selectedColor": "#FA850A"
// },

// "navigationBarBackgroundColor": "#ff6347",