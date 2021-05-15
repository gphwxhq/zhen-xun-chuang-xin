// pages/detailed_news/detailed_news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFinish: false,
    pageInterval:7
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let functionName = options.functionName
    let params = JSON.parse(options.params)
    console.log(params)
    this.setData({
      functionName: functionName,
      params: params,
      title: options.title,
    })
    let self = this
    wx.cloud.callFunction({
      name: functionName,
      data: params,
      success: function (res) {
        if (res.result == null) {
          console.log(res)
          return
        }
        self.setData({
          infoList: res.result
        })
        if (res.result.length < self.data.pageInterval)
          self.setData({
            isFinish: true
          })
        // console.log(res)
      },
      fail: function (res) {
        console.log(res)
      }
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
      ['params.pageNum']: this.data.params.pageNum + 1
    })
    console.log(this.data.params.pageNum)
    let self = this
    wx.cloud.callFunction({
      name: this.data.functionName,
      data: this.data.params,
      success: function (res) {
        if (res.result == null) {
          console.log(res)
          return
        }
        if (res.result.length < self.data.pageInterval)
          self.setData({
            isFinish: true
          })
        self.setData({
          infoList: self.data.infoList.concat(res.result) 
        })
        console.log(res)
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