// pages/detailed_news/detailed_news.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLoading:false,
    isFinish: false,
    isEmpty:false
  },
  click_for_detail(e) {
    wx.navigateTo({
      url: '../details/details?id=' + e.currentTarget.dataset.id,
    })
  },
  toarticles: function (e) {
    let id = e.currentTarget.dataset.id;  // 获取点击的推文的数组下标
    let url = e.currentTarget.dataset.url;  // 通过id判断是哪个推文的链接
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
    let title=options.title
    // console.log(params)
    wx.setNavigationBarTitle({
      title: title
    })
    this.setData({
      functionName: functionName,
      params: params,
      title: title,
    })
  },
  // click_for_detail(e) {
  //   wx.navigateTo({
  //     url: '../details/details?id=' + e.currentTarget.dataset.id,
  //   })
  // },
  toarticles: function (e) {
    var id = e.currentTarget.dataset.id;  // 获取点击的推文的数组下标
    var url = e.currentTarget.dataset.url;  // 通过id判断是哪个推文的链接
    //跳转并传参
    wx.navigateTo({
      url: '/pages/event/event?name=articles&url=' + url,
    })
  },
  del_submit(e){
    let self=this
    console.log(e.currentTarget.dataset.id)
    wx.cloud.callFunction({
      name: "updateInfo",
      //0提交，1草稿
      data: {
        mode:'2',
        id:e.currentTarget.dataset.id
      },
      success: function (res) {
        console.log(res)
        wx.cloud.callFunction({
          name: self.data.functionName,
          data: self.data.params,
          success: function (res) {
            if (res.result == null) {
              console.log(res)
              return
            }
            self.setData({
              infoList: res.result[0]
            })
            if(res.result[0].length==0){
              self.setData({
                isEmpty:true
              })
            }
            if (res.result[0].length <res.result[1])
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
  change_submit(e){
    console.log(e.currentTarget.dataset.info)
    wx.navigateTo({
      url: '/pages/update_info/update_info?data='+JSON.stringify(e.currentTarget.dataset.info),
    })
  },
  show_detail(e){
    console.log(e)
    wx.showModal({
      title: '审核详情',
      showCancel:false,
      content: e.currentTarget.dataset.detail,
    })    
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
    let self = this
    wx.cloud.callFunction({
      name: self.data.functionName,
      data: self.data.params,
      success: function (res) {
        if (res.result == null) {
          console.log(res)
          return
        }
        self.setData({
          infoList: res.result[0]
        })
        if(res.result[0].length==0){
          self.setData({
            isEmpty:true
          })
        }
        if (res.result[0].length <res.result[1])
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
    if(this.data.isFinish)
     return
    this.setData({
      isLoading:true,
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
        self.setData({
          infoList: self.data.infoList.concat(res.result[0]) ,
          isLoading:false
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