Page({
  data: {
    latitude: 30.346,
    longitude: 120.1345,
    windowHeight: wx.getStorageSync('windowHeight'),
    hello: 'Hello World',
    markers: [],
    controls: [{
      id: 1,
      iconPath: '/images/coord.png',
      position: {
        left: wx.getStorageSync('windowWidth') / 2 - 20,
        top: wx.getStorageSync('windowHeight') / 2 - 40,
        width: 40,
        height: 40
      }
    }],
    maskShow: 'hidden'
  },
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('map')
  },
  getCenterLocation: function (callback) {
    var that = this
    this.mapCtx.getCenterLocation({
      success: function (res) {
        if (Math.abs(res.latitude - that.data.latitude) < 0.001 && Math.abs(res.longitude - that.data.longitude) < 0.001) {
          return false;
        } else {
          console.log('latitude: ' + (res.latitude));
          console.log('longitude: ' + (res.longitude));
        }
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        });
        callback && callback();
      }
    })
  },
  getMarkers() {
    const that = this
    wx.request({
      url: 'https://appleta.kelong.cn.com/mapapi.php',
      method: 'GET',
      data: {
        level: 'lat',
        area: that.data.longitude + ',' + that.data.latitude
      },
      dataType: 'json',
      success: function (res) {
        var arr = [];
        for (var i = 0; i < res.data.length; i++) {
          var item = res.data[i];
          if (item.name == '' || item.name == null) {
            continue;
          } else if (item.name.indexOf('&mdash;') > -1) {
            item.name = item.name.replace(/&mdash;/, '—')
            console.log(item.name)
          }
          var marker = {
            iconPath: "/images/location_HL.png",
            id: item.id,
            latitude: item.lat * 1 - 0.0061764463,
            longitude: item.lng * 1 - 0.009772,
            width: 25,
            height: 25,
            callout: {
              content: item.name + '\n' + (item.junjia1 === '暂无' ? '暂无均价' : (parseInt(item.junjia1) + '元/㎡')),
              color: '#ffffff',
              x: 120,
              y: -20,
              bgColor: '#ff5252',
              padding: 8,
              display: 'ALWAYS',
              borderRadius: 5
            }
          };
          arr.push(marker);
        }
        that.setData({
          markers: arr
        });
      },
      fail: function ({ errMsg }) {
        console.log('请求失败: ', errMsg)
      }
    })
  },
  getPhoneInfo() {
    var that = this;
    var res = wx.getSystemInfoSync();
    console.log(res)
    if (that.data.windowHeight === '' || that.data.windowHeight === null) {
      that.setData({
        windowHeight: res.windowHeight,
        windowWidth: res.windowWidth,
        system: res.system,
        model: res.model
      });
      wx.setStorageSync('windowHeight', res.windowHeight);
      wx.setStorageSync('windowWidth', res.windowWidth);
      wx.setStorageSync('system', res.system);
      wx.setStorageSync('model', res.model);
    }
  },
  getLocation(callback) {
    var that = this
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        console.log(res)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        });
        if (typeof callback === 'undefined') {
          return false;
        }
        callback();
      }
    })
  },
  regionchange(e) {
    var that = this
    console.log(e)
    if (e.type == 'end') {
      that.getCenterLocation(that.getMarkers);
    }
  },
  markertap(e) {
    console.log(e.markerId)
  },
  callouttap(e) {
    wx.navigateTo({
      url: '/pages/index/detail/detail?id=' + e.markerId
    });
  },
  onLoad() {
    var that = this;
    that.getPhoneInfo();
    that.getLocation(that.getMarkers);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    return {
      title: '杭州房价地图',
      path: '/pages/index/index',
      success: function (res) {
        console.log('success')
      }
    }
  }

});
