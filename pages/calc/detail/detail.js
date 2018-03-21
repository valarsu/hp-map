// pages/calc/detail/detail.js
Page({
  data: {
    tab_index: 0,
    tabs: ['等额本息', '等额本金']
  },

  changeTab(e) {
    var that = this
    var param = e.target.dataset
    that.setData({
      tab_index: param.tab
    })
  },

  calcTotal (year, basic, rate) {
    var that = this
    let W = year * 12
    let P = basic * 10000
    let R = rate / 12

    // 等额本息
    let avageTotal = (P * (R * Math.pow((1 + R), W) / (Math.pow((1 + R), W) - 1))).toFixed(2)
    let priceTotal = (W * avageTotal / 10000).toFixed(2)
    that.setData({
      priceTotal: priceTotal,
      intTotal: (priceTotal - basic).toFixed(2),
      avageTotal: avageTotal
    })

    // 等额本金

    let intTotalCapital = (W + 1) * P * R / 2 / 10000
    let priceTotalCapital = (intTotalCapital * 10000 + P) / 10000
    let priceFirstCapital = (P / W) + P * R
    
    that.setData({
      intTotalCapital: intTotalCapital.toFixed(2),
      priceTotalCapital: priceTotalCapital.toFixed(2),
      priceFirstCapital: priceFirstCapital.toFixed(2)
    })

    console.log(intTotalCapital);
  },

  calcTotalMix (year, basic, rate, yearFund, basicFund, rateFund) {
    var that = this
    let W1 = year * 12
    let P1 = basic * 10000
    let R1 = rate / 12
    let W2 = yearFund * 12
    let P2 = basicFund * 10000
    let R2 = rateFund / 12

    that.setData({
      loanTotal: basic * 1 + basicFund * 1
    })

    // 等额本息

      // 商贷
    let avageTotalMix = (P1 * (R1 * Math.pow((1 + R1), W1) / (Math.pow((1 + R1), W1) - 1))).toFixed(2)
    let priceTotalMix = (W1 * avageTotalMix / 10000).toFixed(2)
    that.setData({
      priceTotalMix: priceTotalMix,
      intTotalMix: (priceTotalMix - basic).toFixed(2),
      avageTotalMix: avageTotalMix
    })

      // 公积金
    let avageTotalMixFund = (P2 * (R2 * Math.pow((1 + R2), W2) / (Math.pow((1 + R2), W2) - 1))).toFixed(2)
    let priceTotalMixFund = (W2 * avageTotalMixFund / 10000).toFixed(2)
    that.setData({
      priceTotalMixFund: priceTotalMixFund,
      intTotalMixFund: (priceTotalMixFund - basicFund).toFixed(2),
      avageTotalMixFund: avageTotalMixFund
    })

      // 等额本息还款总额，利息总额
    that.setData({
      totalMix: priceTotalMix * 1 + priceTotalMixFund * 1,
      intMix: that.data.intTotalMix * 1 + that.data.intTotalMixFund * 1
    })

    // 等额本金

      // 商贷
    let intTotalCapMix = (W1 + 1) * P1 * R1 / 2 / 10000
    let priceTotalCapMix = (intTotalCapMix * 10000 + P1) / 10000
    let priceFirstCapMix = (P1 / W1) + P1 * R1

    that.setData({
      intTotalCapMix: intTotalCapMix.toFixed(2),
      priceTotalCapMix: priceTotalCapMix.toFixed(2),
      priceFirstCapMix: priceFirstCapMix.toFixed(2)
    })

      // 公积金
    let intTotalCapMixFund = (W2 + 1) * P2 * R2 / 2 / 10000
    let priceTotalCapMixFund = (intTotalCapMixFund * 10000 + P2) / 10000
    let priceFirstCapMixFund = (P2 / W2) + P2 * R2

    that.setData({
      intTotalCapMixFund: intTotalCapMixFund.toFixed(2),
      priceTotalCapMixFund: priceTotalCapMixFund.toFixed(2),
      priceFirstCapMixFund: priceFirstCapMixFund.toFixed(2)
    })

      // 等额本金还款总额，利息总额
    that.setData({
      totalMixCap: (priceTotalCapMix * 1 + priceTotalCapMixFund * 1).toFixed(2),
      intMixCap: (intTotalCapMix * 1 + intTotalCapMixFund * 1).toFixed(2)
    })
  },

  bindCalc(e) {
    var that = this
    var param = e.target.dataset
    console.log(param.mix)
    if (!param.mix) {
      wx.navigateTo({
        url: `/pages/calc/detail/list/list?p=${that.data.busiPriceTotal}&r=${that.data.loanRate}&y=${that.data.indexYear}&type=${that.data.tab_index}`
      });
    } else {
      wx.navigateTo({
        url: `/pages/calc/detail/list/list?p1=${that.data.busiPriceTotalMix}&r1=${that.data.loanRateMix}&y1=${that.data.indexYearMix}&p2=${that.data.busiPriceTotalMixFund}&r2=${that.data.loanRateMixFund}&y2=${that.data.indexYearMixFund}&type=${that.data.tab_index}`
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.setNavigationBarTitle({
      title: '房贷计算器'
    })
    if (options.p) {
      that.setData({
        busiPriceTotal: options.p,
        indexYear: options.y,
        loanRate: options.r,
        parts: `${options.y}年（${options.y * 12}期）`
      })

      that.calcTotal(options.y, options.p, options.r)
      
    } else {
      that.setData({
        busiPriceTotalMix: options.p1,
        indexYearMix: options.y1,
        loanRateMix: options.r1,
        partsMix: `${options.y1}年（${options.y1 * 12}期）`,

        busiPriceTotalMixFund: options.p2,
        indexYearMixFund: options.y2,
        loanRateMixFund: options.r2,
        partsMixFund: `${options.y2}年（${options.y2 * 12}期）`
      })

      that.calcTotalMix(options.y1, options.p1, options.r1, options.y2, options.p2, options.r2)
    }

    
  }
})