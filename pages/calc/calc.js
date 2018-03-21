// pages/calc/calc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab_index: 0,
    tabs: ['总价', '商业贷', '公积金贷', '组合贷'],
    priceSize: 0,
    priceAvage: 0,
    priceTotal: (0).toFixed(2),

    // 商业贷款
    arrayRate: ['一成（10%）', '二成（20%）', '三成（30%）', '四成（40%）', '五成（50%）', '六成（60%）', '七成（70%）', '八成（80%）', '九成（90%）'],
    arrayLoanRate: ['7折基准利率|4.9%x0.7', '85折基准利率|4.9%x0.85', '88折基准利率|4.9%x0.88', '基准利率|4.9%', '1.1倍基准利率|4.9%x1.1'],
    indexYear: 19,
    indexRate: 2,
    indexLoanRate: 3,
    busiPriceTotal: (0).toFixed(2),
    baseLoanRate: 0.049,
    loanRate: 0.049,

    // 公积金贷款
    indexYearFund: 19,
    indexRateFund: 2,
    baseLoanRateFund: 0.0325,
    loanRateFund: 0.0325,
    busiPriceTotalFund: (0).toFixed(2),
    arrayLoanRateFund: ['7折基准利率|3.25%x0.7', '85折基准利率|3.25%x0.85', '88折基准利率|3.25%x0.88', '基准利率|3.25%', '1.1倍基准利率|3.25%x1.1'],
    indexLoanRateFund: 3,

    // 组合贷款商业
    priceTotalMix: (0).toFixed(2),
    indexYearMix: 19,
    loanRateMix: 0.049,
    indexLoanRateMix: 3,

    // 组合贷款公积金
    priceTotalMixFund: (0).toFixed(2),
    indexYearMixFund: 19,
    loanRateMixFund: 0.0325,
    indexLoanRateMixFund: 3

  },

  changeTab(e) {
    var that = this
    var param = e.target.dataset
    that.setData({
      tab_index: param.tab
    })
  },

  bindCalc (e) {
    var that = this
    var param = e.target.dataset
    if (param.type == 'fund') {
      wx.navigateTo({
        url: `/pages/calc/detail/detail?p=${that.data.busiPriceTotal}&r=${that.data.loanRateFund}&y=${that.data.indexYearFund + 1}`
      });
    } else if (param.type == 'mix') {
      wx.navigateTo({
        url: `/pages/calc/detail/detail?p1=${that.data.priceTotalMix}&r1=${that.data.loanRateMix}&y1=${that.data.indexYearMix + 1}&p2=${that.data.priceTotalMixFund}&r2=${that.data.loanRateMixFund}&y2=${that.data.indexYearMixFund + 1}`
      });
    } else {
      wx.navigateTo({
        url: `/pages/calc/detail/detail?p=${that.data.busiPriceTotal}&r=${that.data.loanRate}&y=${that.data.indexYear + 1}`
      });
    }

  },

  bindSize(e) {
    var that = this
    that.setData({
      priceSize: e.detail.value * 1,
      priceTotal: (e.detail.value * 1 * that.data.priceAvage / 10000).toFixed(2)
    })
    that.bindLoanTotal()
  },

  bindAvage(e) {
    var that = this
    that.setData({
      priceAvage: e.detail.value * 1,
      priceTotal: (that.data.priceSize * e.detail.value * 1 / 10000).toFixed(2)
    })
    that.bindLoanTotal()
  },

  bindTotal(e) {
    var that = this
    var param = e.target.dataset
    if (param.type == 'mix') {
      that.setData({
        priceTotalMix: e.detail.value * 1
      })
    } else if (param.type == 'mixFund') {
      that.setData({
        priceTotalMixFund: e.detail.value * 1
      })
    } else {
      that.setData({
        priceTotal: e.detail.value * 1
      })
      that.bindLoanTotal()
    }

  },



  changeRate: function (e) {
    var that = this
    var param = e.target.dataset
    if (param.type == 'fund') {
      that.setData({
        indexRateFund: e.detail.value * 1
      })
    } else {
      that.setData({
        indexRate: e.detail.value * 1
      })
    }
    that.bindLoanTotal()
  },

  changeYear: function (e) {
    var param = e.target.dataset
    if (param.type == 'fund') {
      this.setData({
        indexYearFund: e.detail.value * 1
      })
    } else if (param.type == 'mix') {
      this.setData({
        indexYearMix: e.detail.value * 1
      })
    } else if (param.type == 'mixFund') {
      this.setData({
        indexYearMixFund: e.detail.value * 1
      })
    } else {
      this.setData({
        indexYear: e.detail.value * 1
      })
    }
  },

  changeLoanRate: function (e) {
    var that = this
    var param = e.target.dataset
    let index = e.detail.value * 1
    let loanRate = that.data.arrayLoanRate[index].split('|')[1].split('%')
    if (param.type == 'fund') {
      that.setData({
        indexLoanRateFund: index
      })
      let loanRate = that.data.arrayLoanRate[index].split('|')[1].split('%')
      if (loanRate[1] !== '') {
        that.setData({
          loanRateFund: loanRate[1].split('x')[1] * 1 * that.data.baseLoanRateFund
        })
      } else {
        that.setData({
          loanRateFund: that.data.baseLoanRateFund
        })
      }
      console.log(that.data.loanRateFund)
    } else if (param.type == 'mix') {
      that.setData({
        indexLoanRateMix: index
      })
      if (loanRate[1] !== '') {
        that.setData({
          loanRateMix: loanRate[1].split('x')[1] * 1 * that.data.baseLoanRate
        })
      } else {
        that.setData({
          loanRateMix: that.data.baseLoanRate
        })
      }
      console.log(that.data.loanRateMix)
    } else if (param.type == 'mixFund') {
      that.setData({
        indexLoanRateMixFund: index
      })
      if (loanRate[1] !== '') {
        that.setData({
          loanRateMixFund: loanRate[1].split('x')[1] * 1 * that.data.baseLoanRateFund
        })
      } else {
        that.setData({
          loanRateMixFund: that.data.baseLoanRateFund
        })
      }
      console.log(that.data.loanRateMixFund)
    } else {
      that.setData({
        indexLoanRate: index
      })
      if (loanRate[1] !== '') {
        that.setData({
          loanRate: loanRate[1].split('x')[1] * 1 * that.data.baseLoanRate
        })
      } else {
        that.setData({
          loanRate: that.data.baseLoanRate
        })
      }
      console.log(that.data.loanRate)
    }



  },

  initYear() {
    var that = this
    var arr = []
    for (var i = 1; i <= 30; i ++) {
      arr.push(`${i}年(${i * 12})期`)
    }
    that.setData({
      arrayYear: arr
    })
  },

  bindLoanTotal () {
    var that = this
    that.setData({
      busiPriceTotal: (that.data.priceTotal * (1 - (that.data.indexRate * 1 + 1) / 10)).toFixed(2)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.initYear()
    wx.setNavigationBarTitle({
      title: '房贷计算器'
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    return {
      title: '房贷计算器',
      path: '/pages/calc/calc',
      success: function (res) {
        console.log('success')
      }
    }
  }
})
