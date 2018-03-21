Page({
  data: {
    showName: 'house-main',
    res: '',
    list: [
      {
        btns: [
          {
            name: 'a',
            desc: '杭州城区户籍'
          },
          {
            name: 'b',
            desc: '四县市户籍'
          },
          {
            name: 'c',
            desc: '外地户籍'
          }
        ],
        name: 'census',
        title: '您的户籍情况',
        desc: '',
        remark: '注：杭州城区户籍:（包含主城、余杭、萧山、富阳及大江东地区），四县市户籍:（包含桐庐、建德、临安、淳安地区）'
      },
      {
        btns: [
          {
            name: 'a',
            desc: '0套房产'
          },
          {
            name: 'b',
            desc: '1套房产'
          },
          {
            name: 'c',
            desc: '2套及以上房产'
          }
        ],
        name: 'houses',
        title: '本市范围内您的房产套数',
        desc: '（含住宅、酒店式公寓、商铺、写字楼等）（包含夫妻二人及未成年子女）',
        remark: ''
      },
      {
        btns: [
          {
            name: 'a',
            desc: '0套房产'
          },
          {
            name: 'b',
            desc: '1套房产'
          }
        ],
        name: 'houses2',
        title: '本市范围内您的房产套数',
        desc: '（含住宅、酒店式公寓、商铺、写字楼等）（包含夫妻二人及未成年子女）',
        remark: ''
      },
      {
        btns: [
          {
            name: 'a',
            desc: '单身（含离异）'
          },
          {
            name: 'b',
            desc: '已婚'
          }
        ],
        name: 'marry',
        title: '您的婚姻情况',
        desc: '',
        remark: ''
      },
      {
        btns: [
          {
            name: 'a',
            desc: '无住宅贷款'
          },
          {
            name: 'b',
            desc: '有住宅贷款'
          }
        ],
        name: 'loan',
        title: '您的贷款情况',
        desc: '',
        remark: ''
      },
      {
        btns: [
          {
            name: 'a',
            desc: '0套房产'
          },
          {
            name: 'b',
            desc: '1套房产'
          },
          {
            name: 'c',
            desc: '2套及以上房产'
          }
        ],
        name: 'buildings',
        title: '您名下房产中含几套住宅',
        desc: '',
        remark: ''
      },
      {
        btns: [
          {
            name: 'a',
            desc: '0套房产'
          },
          {
            name: 'b',
            desc: '1套房产'
          }
        ],
        name: 'buildings2',
        title: '您名下房产中含几套住宅',
        desc: '',
        remark: ''
      },
      {
        btns: [
          {
            name: 'a',
            desc: '0套房产'
          },
          {
            name: 'b',
            desc: '1套房产'
          }
        ],
        name: 'buildings3',
        title: '您名下房产中含几套住宅',
        desc: '',
        remark: ''
      },
      {
        btns: [
          {
            name: 'a',
            desc: '是'
          },
          {
            name: 'b',
            desc: '否'
          }
        ],
        name: 'settle',
        title: '您是否在2017年3月29日之前完成落户',
        desc: '',
        remark: ''
      },
      {
        btns: [
          {
            name: 'a',
            desc: '是'
          },
          {
            name: 'b',
            desc: '否'
          }
        ],
        name: 'social',
        title: '您是否连续缴纳2年以上个税或社保',
        desc: '',
        remark: ''
      }
    ],
    results: [
      {
        name: 'a',
        content: '恭喜您！',
        content2: '您可购1套住宅',
        content3: '首付不低于30%',
        mark: '（公积金贷款利率按同期住房公积金贷款基准利率的1.1倍执行）'
      },
      {
        name: 'b',
        content: '恭喜您！',
        content2: '您可购2套住宅',
        content3: '首套首付不低于30%，二套首付不低于60%',
        mark: '（公积金贷款利率按同期住房公积金贷款基准利率的1.1倍执行）'
      },
      {
        name: 'c',
        content: '恭喜您！',
        content2: '您可购2套住宅',
        content3: '两套首付均不低于60%',
        mark: '（公积金贷款利率按同期公积金贷款基准利率的1.1倍执行）'
      },
      {
        name: 'd',
        content: '恭喜您！',
        content2: '您可购1套住宅',
        content3: '首付不低于30%',
        mark: ''
      },
      {
        name: 'e',
        content: '很抱歉！',
        content2: '您暂无购买住宅资格',
        content3: '',
        mark: '（2017年3月29日起，本市户籍成年单身(含离异)人士在限购区域内限购1套住房）'
      },
      {
        name: 'f',
        content: '很抱歉！',
        content2: '您暂无购买住宅资格',
        content3: '',
        mark: '（2017年3月29日起，由外地迁入四县市的居民家庭自迁入之日满2年，方可在本市市区范围内购房）'
      },
      {
        name: 'g',
        content: '恭喜您！',
        content2: '您可购1套住宅',
        content3: '首付不低于60%',
        mark: '（公积金贷款利率按同期住房公积金贷款基准利率的1.1倍执行）<br />（若在外地有住宅贷款：一套在贷首付需不低于60%；2套在贷需全款购房，不可贷款）'
      },
      {
        name: 'h',
        content: '很抱歉！',
        content2: '您暂无购买住宅资格',
        content3: '',
        mark: '（2016年9月19日起，暂停在杭州市区限购范围内向拥有1套及以上住房的非本市户籍居民出售住房）'
      },
      {
        name: 'i',
        content: '很抱歉！',
        content2: '您没有购买住宅资格',
        content3: '',
        mark: '（2017年3月3日起，外地人在杭州市区购房需连续缴纳2年以上个税或社保）'
      },
      {
        name: 'j',
        content: '很抱歉！',
        content2: '您没有购买住宅资格',
        content3: '',
        mark: '（2017年3月3日起，杭州本地户籍居民家庭最多可购买两套住房，第三套限购）'
      }
    ]
  },
  toSettlement(e) {
    var that = this
    var param = e.target.dataset
    var desc = param.desc

    var resNew = that.data.res + desc
    // console.log(desc)

    that.setData({
      res: resNew,
      showName: 'census'
    })
  },
  doNext(e) {
    var that = this
    var param = e.target.dataset
    var desc = param.desc

    console.log(that.data.res)

    var resNew = that.data.res + desc

    console.log(111111111111)


    that.setData({
      res: resNew,
    })
    console.log(resNew)
    if (resNew == 'a') {
      that.setData({
        showName: 'census'
      })
    }
    if (resNew == 'aa' || resNew == 'aba') {
      that.setData({
        showName: 'houses'
      })
    }
    if (resNew == 'aca') {
      that.setData({
        showName: 'houses2'
      })
    }
    if (resNew == 'ab') {
      that.setData({
        showName: 'settle'
      })
    }
    if (resNew == 'ac') {
      that.setData({
        showName: 'social'
      })
    }
    if (resNew == 'aac' || resNew == 'abac') {
      that.setData({
        showName: 'buildings'
      })
    }
    if (resNew == 'aab' || resNew == 'abab') {
      that.setData({
        showName: 'buildings2'
      })
    }
    if (resNew == 'acab') {
      that.setData({
        showName: 'buildings3'
      })
    }
    if (resNew == 'aaa' || resNew == 'aaba' || resNew == 'aabb' || resNew == 'aaca' || resNew == 'aacb' || resNew == 'abaa' || resNew == 'ababa' || resNew == 'ababb' || resNew == 'abaca' || resNew == 'abacb') {
      that.setData({
        showName: 'marry'
      })
    }
    if (resNew == 'aaaa' || resNew == 'aaab' || resNew == 'aabaa' || resNew == 'aabab' || resNew == 'aacaa' || resNew == 'aacab' || resNew == 'abaaa' || resNew == 'abaab' || resNew == 'ababaa' || resNew == 'ababab' || resNew == 'abacaa' || resNew == 'abacab' || resNew == 'acaa' || resNew == 'acaba') {
      that.setData({
        showName: 'loan'
      })
    }

    // 结果
    if (resNew == 'aaaaa' || resNew == 'aabaaa' || resNew == 'aacaaa' || resNew == 'abaaaa' || resNew == 'ababaaa' || resNew == 'abacaaa' || resNew == 'acaaa' || resNew == 'acabaa') {
      that.setData({
        showName: 'a'
      })
    }
    if (resNew == 'aaaab' || resNew == 'aabbb' || resNew == 'aabaab' || resNew == 'aacaab' || resNew == 'aacbb' || resNew == 'abaaab' || resNew == 'ababaab' || resNew == 'abacaab' || resNew == 'abacbb' || resNew == 'acaab' || resNew == 'ababbb') {
      that.setData({
        showName: 'b'
      })
    }
    if (resNew == 'aaaba' || resNew == 'aababa' || resNew == 'aacaba' || resNew == 'abaaba' || resNew == 'abababa' || resNew == 'abacaba') {
      that.setData({
        showName: 'c'
      })
    }
    if (resNew == 'aaabb' || resNew == 'aababb' || resNew == 'aacabb' || resNew == 'abaabb' || resNew == 'abababb' || resNew == 'abacabb') {
      that.setData({
        showName: 'd'
      })
    }
    if (resNew == 'aabba' || resNew == 'aacba' || resNew == 'ababba' || resNew == 'abacba') {
      that.setData({
        showName: 'e'
      })
    }
    if (resNew == 'abb') {
      that.setData({
        showName: 'f'
      })
    }
    if (resNew == 'acabab') {
      that.setData({
        showName: 'g'
      })
    }
    if (resNew == 'acabb') {
      that.setData({
        showName: 'h'
      })
    }
    if (resNew == 'acb') {
      that.setData({
        showName: 'i'
      })
    }
    if (resNew == 'aacc' || resNew == 'abacc') {
      that.setData({
        showName: 'j'
      })
    }
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    wx.setNavigationBarTitle({
      title: '购房资格测试'
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    return {
      title: '购房资格测试',
      path: '/pages/limitation/limitation',
      success: function (res) {
        console.log('success')
      }
    }
  }
})

