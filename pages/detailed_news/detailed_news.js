// pages/detailed_news/detailed_news.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLoading: false,
    isFinish: false,
    isEmpty: false
  },
  click_for_detail(e) {
    wx.navigateTo({
      url: '../details/details?id=' + e.currentTarget.dataset.id,
    })
  },
  toarticles: function (e) {
    let id = e.currentTarget.dataset.id; // 获取点击的推文的数组下标
    let url = e.currentTarget.dataset.url; // 通过id判断是哪个推文的链接
    //跳转并传参
    wx.navigateTo({
      url: '/pages/event/event?name=articles&url=' + url,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let functionName = options.functionName
    let params = JSON.parse(options.params)
    let title = options.title
    // console.log(params)
    wx.setNavigationBarTitle({
      title: title
    })
    this.setData({
      functionName: functionName,
      params: params,
      title: title,
    })
    if (title != '申请列表') {
      let self = this
      wx.cloud.callFunction({
        name: self.data.functionName,
        data: self.data.params,
        success: function (res) {
          if (res.result == null) {
            console.log(res)
            return
          }
          let mlist = res.result[0]
          if (self.data.title == '申请列表') {
            mlist.forEach(function (item) {
              let mdate = new Date(item.updateDate)
              item.updateDate = self.generateDate(mdate)
            })
          }
          self.setData({
            infoList: mlist
          })
          if (res.result[0].length == 0) {
            self.setData({
              isEmpty: true
            })
          }
          if (res.result[0].length < res.result[1])
            self.setData({
              isFinish: true
            })
          console.log(res)
        },
        fail: function (res) {
          self.setData({
            isEmpty: true
          })
          console.log(res)
        }
      })
    }
  },
  // click_for_detail(e) {
  //   wx.navigateTo({
  //     url: '../details/details?id=' + e.currentTarget.dataset.id,
  //   })
  // },
  toarticles: function (e) {
    var id = e.currentTarget.dataset.id; // 获取点击的推文的数组下标
    var url = e.currentTarget.dataset.url; // 通过id判断是哪个推文的链接
    //跳转并传参
    wx.navigateTo({
      url: '/pages/event/event?name=articles&url=' + url,
    })
  },
  showFadeawayText() {
    this.animate('.flex_row', [{
        opacity: 1
      },
      {
        opacity: 0
      }
    ], 500)
  },
  showFadeinText() {
    this.animate('.flex_row', [{
        opacity: 0
      },
      {
        opacity: 1
      }
    ], 500, function () {
      this.clearAnimation('.flex_row', function () {
        // console.log("清除了text_container上的动画")
      })
    }.bind(this))
  },
  del_submit(e) {
    let self = this
    console.log(e.currentTarget.dataset.id)
    this.setData({
      isLoading: true,
      ['params.pageNum']: 1,
      isFinish: false
    })
    this.showFadeawayText()
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: "updateInfo",
      //0提交，1草稿
      data: {
        mode: '2',
        id: e.currentTarget.dataset.id
      },
      success: function (res) {
        console.log(res)
        wx.hideLoading({
          success: (res) => {
            wx.showToast({
              title: '成功',
            })
          },
        })
        wx.cloud.callFunction({
          name: self.data.functionName,
          data: self.data.params,
          success: function (res) {
            if (res.result == null) {
              console.log(res)
              return
            }
            let mlist = res.result[0]

            mlist.forEach(function (item) {
              let mdate = new Date(item.updateDate)
              item.updateDate = self.generateDate(mdate)
            })

            self.setData({
              infoList: mlist,
              isLoading: false
            })
            self.showFadeinText()
            if (res.result[0].length == 0) {
              self.setData({
                isEmpty: true
              })
            }
            if (res.result[0].length < res.result[1])
              self.setData({
                isFinish: true
              })
            console.log(res)
          },
          fail: function (res) {
            self.setData({
              isEmpty: true
            })
            console.log(res)
          }
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })

  },
  change_submit(e) {
    console.log(e.currentTarget.dataset.info)
    wx.navigateTo({
      url: '/pages/update_info/update_info?data=' + JSON.stringify(e.currentTarget.dataset.info),
    })
  },
  show_detail(e) {
    if (e.currentTarget.dataset.state != 0) {
      wx.showModal({
        title: '审核详情',
        showCancel: false,
        content: e.currentTarget.dataset.detail,
      })
    }
  },
  generateDate(mdate) {
    let minutes = mdate.getMinutes() > 9 ? mdate.getMinutes() : '0' + mdate.getMinutes()
    let seconds = mdate.getSeconds() > 9 ? mdate.getSeconds() : '0' + mdate.getSeconds()
    return mdate.getFullYear() + "-" + (mdate.getMonth() + 1) + "-" + mdate.getDate() + ' ' + mdate.getHours() + ':' + minutes + ':' + seconds;
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
    if (this.data.title != '申请列表')
      return
    let self = this
    wx.cloud.callFunction({
      name: self.data.functionName,
      data: self.data.params,
      success: function (res) {
        if (res.result == null) {
          console.log(res)
          return
        }
        let mlist = res.result[0]
        if (self.data.title == '申请列表') {
          mlist.forEach(function (item) {
            let mdate = new Date(item.updateDate)
            item.updateDate = self.generateDate(mdate)
          })
        }
        self.setData({
          infoList: mlist
        })
        if (res.result[0].length == 0) {
          self.setData({
            isEmpty: true
          })
        }
        if (res.result[0].length < res.result[1])
          self.setData({
            isFinish: true
          })
        console.log(res)
      },
      fail: function (res) {
        self.setData({
          isEmpty: true
        })
        console.log(res)
      }
    })
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
    if (this.data.isFinish)
      return
    this.setData({
      isLoading: true,
      ['params.pageNum']: this.data.params.pageNum + 1
    })
    // console.log(this.data.params.pageNum)
    let self = this
    wx.cloud.callFunction({
      name: this.data.functionName,
      data: this.data.params,
      success: function (res) {
        if (res.result == null) {
          console.log(res)
          return
        }
        if (res.result[0].length < res.result[1])
          self.setData({
            isFinish: true
          })
        let mlist = res.result[0]
        if (self.data.title == '申请列表') {
          mlist.forEach(function (item) {
            let mdate = new Date(item.updateDate)
            item.updateDate = self.generateDate(mdate)
          })
        }
        self.setData({
          infoList: self.data.infoList.concat(mlist),
          isLoading: false
        })
        // console.log(res)
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})