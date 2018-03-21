// pages/calc/detail/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    caidan: false
  },

  calcDetail(year, basic, rate, type) {
    const that = this    
    if (!year) { year = 20 }
    if (!basic) { basic = 20 }
    if (!rate) { rate = 0.049 }
    if (!type) { type = 1 }
    var res = {}
    res.arr = []    
    var addLoan = 0 

    for (let i = 0; i < year; i++) {
      res.arr[i] = {}
      res.arr[i].title = `第${i + 1}年`
      res.arr[i].list = []

      for (let j = 0; j < 12; j++) {
        res.arr[i].list[j] = {}

        let N = (i * 12) + (j + 1)
        let W = year * 12
        let P = basic * 10000
        let R = rate / 12

        if (type == 1) {
          // 等额本金
          let priceTotal = (W + 1) * P * R / 2 + P
          var avageBasic = P / W     
          var avageInt = (P - P * (N - 1) / W) * R
          var avageTotal = avageBasic + avageInt
          addLoan += avageTotal          
          var resLoan = priceTotal - addLoan
        } else {
          // 等额本息
          var avageTotal = (P * (R * Math.pow((1 + R), W) / (Math.pow((1 + R), W) - 1)))
          var avageBasic = ((avageTotal - P * R) * Math.pow((1 + R), N - 1))
          var avageInt = (avageTotal - avageBasic)
          var resLoan = (avageTotal * (W - N))
        }
        res.arr[i].list[j].month = `${j + 1}月`
        res.arr[i].list[j].avageTotal = avageTotal.toFixed(2)
        res.arr[i].list[j].avageBasic = avageBasic.toFixed(2)
        res.arr[i].list[j].avageInt = avageInt.toFixed(2)
        res.arr[i].list[j].resLoan = resLoan.toFixed(0)

        that.setData({
          list: res
        })
      }
    }
  },


  calcMixDetail(year, basic, rate, yearFund, basicFund, rateFund, type) {
    const that = this
    if (!year) { year = 20 }
    if (!basic) { basic = 30 }
    if (!rate) { rate = 0.049 }
    if (!yearFund) { yearFund = 22 }
    if (!basicFund) { basicFund = 70 }
    if (!rateFund) { rateFund = 0.0325 }
    if (!type) { type = 0 }
    var res = {}
    res.arr = []
    var addLoan = 0
    var addLoanOverflow = 0 // 溢出的累加金额    
    var minYear = Math.min(year, yearFund)
    var maxYear = Math.max(year, yearFund)

    let W1 = year * 12
    let P1 = basic * 10000
    let R1 = rate / 12
    let W2 = yearFund * 12
    let P2 = basicFund * 10000
    let R2 = rateFund / 12

    for (let i = 0; i < minYear; i++) {
      res.arr[i] = {}
      res.arr[i].title = `第${i + 1}年`
      res.arr[i].list = []

      for (let j = 0; j < 12; j++) {
        res.arr[i].list[j] = {}

        let N = (i * 12) + (j + 1)


        if (type == 1) {
          // 等额本金
          let priceTotalMix = (W1 + 1) * P1 * R1 / 2 + P1
          let priceTotalFund = (W2 + 1) * P2 * R2 / 2 + P2
          let priceTotal = priceTotalMix + priceTotalFund
          var avageBasic = P1 / W1 + P2 / W2
          var avageInt = (P1 - P1 * (N - 1) / W1) * R1 + (P2 - P2 * (N - 1) / W2) * R2
          var avageTotal = avageBasic + avageInt
          addLoan += avageTotal
          var resLoan = priceTotal - addLoan
        } else {
          // 等额本息
          var avageTotalMix = (P1 * (R1 * Math.pow((1 + R1), W1) / (Math.pow((1 + R1), W1) - 1)))
          var avageTotalFund = (P2 * (R2 * Math.pow((1 + R2), W2) / (Math.pow((1 + R2), W2) - 1)))
          var avageTotal = avageTotalMix + avageTotalFund

          var avageBasicMix = ((avageTotalMix - P1 * R1) * Math.pow((1 + R1), N - 1)) 
          var avageBasicFund = + ((avageTotalFund - P2 * R2) * Math.pow((1 + R2), N - 1))
          var avageBasic = avageBasicMix + avageBasicFund

          var avageInt = (avageTotal - avageBasic)
          var resLoan = (avageTotalMix * (W1 - N)) + (avageTotalFund * (W2 - N))
          
        }
        res.arr[i].list[j].month = `${j + 1}月`
        res.arr[i].list[j].avageTotal = avageTotal.toFixed(2)
        res.arr[i].list[j].avageBasic = avageBasic.toFixed(2)
        res.arr[i].list[j].avageInt = avageInt.toFixed(2)
        res.arr[i].list[j].resLoan = resLoan.toFixed(0)

        that.setData({
          list: res
        })
      }
    }
        
    // 考虑到不同年的情况
    for (let i = minYear; i < maxYear; i ++) {
      res.arr[i] = {}
      res.arr[i].title = `第${i + 1}年`
      res.arr[i].list = []

      for (let j = 0; j < 12; j++) {
        res.arr[i].list[j] = {}

        let N = (i * 12) + (j + 1)
        let P, W, R
        if (year > yearFund) {
          P = P1, W = W1, R = R1
        } else {
          P = P2, W = W2, R = R2
        }
        if (type == 1) {
          // 等额本金
          let priceTotal = res.arr[minYear - 1].list[11].resLoan
          var avageBasic = P / W
          var avageInt = (P - P * (N - 1) / W) * R
          var avageTotal = avageBasic + avageInt
          addLoanOverflow += avageTotal
          var resLoan = priceTotal - addLoanOverflow


        } else {
          // 等额本息
          var avageTotal = (P * (R * Math.pow((1 + R), W) / (Math.pow((1 + R), W) - 1)))
          var avageBasic = ((avageTotal - P * R) * Math.pow((1 + R), N - 1))
          var avageInt = (avageTotal - avageBasic)
          var resLoan = (avageTotal * (W - N))

        }



        res.arr[i].list[j].month = `${j + 1}月`
        res.arr[i].list[j].avageTotal = avageTotal.toFixed(2)
        res.arr[i].list[j].avageBasic = avageBasic.toFixed(2)
        res.arr[i].list[j].avageInt = avageInt.toFixed(2)
        res.arr[i].list[j].resLoan = resLoan.toFixed(0)

        that.setData({
          list: res
        })
      }
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
        loanRate: options.r
      })
      console.log(options.type)
      that.calcDetail(options.y, options.p, options.r, options.type)
    } else {
      that.setData({
        busiPriceTotalMix: options.p1,
        indexYearMix: options.y1,
        loanRateMix: options.r1,
        busiPriceTotalMixFund: options.p2,
        indexYearMixFund: options.y2,
        loanRateMixFund: options.r2,
        loanType: options.type
      })
      that.calcMixDetail(options.y1, options.p1, options.r1, options.y2, options.p2, options.r2, options.type)
    }
    setTimeout(function() {
      that.setData({
        caidan: true
      })
    }, 50000)

  }
})