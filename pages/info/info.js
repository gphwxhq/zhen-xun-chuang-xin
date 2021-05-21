// pages/info/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,

  },
  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    this.showFadeawayInfo()
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        // console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        this.showFadeinItem('.info')
      },
      fail: (res) => {
        console.log(res)
        this.showFadeinItem('.info')
      }
    })
    
  },
  showFadeawayInfo(){
    this.animate('.info', [
      {opacity:1},
      {opacity:0}
      ], 500)
  },
  showFadeinItem(e){
    this.animate(e, [
      {opacity:0},
      {opacity:1}
      ], 500, function () {
        this.clearAnimation(e, function () {
          // console.log("清除了info上的动画")
        })
    }.bind(this))
  },
  getMotto() {
    let self = this
    wx.cloud.callFunction({
      name: "getMotto",
      data: {},
      success: function (res) {
        // console.log(res)
        self.showFadeinItem('.motto')
        self.setData({
          motto:res.result
        })

      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMotto()
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

  },

  /**
   * 用户点击右上角分享
   */
  onAddToFavorites(res) {
    return {
      imageUrl: 'cloud://main-2gjpci0p59828101.6d61-main-2gjpci0p59828101-1305705970/src/share_logo.jpg'
    }
  },
  onShareAppMessage(option){
    return {
      imageUrl: 'cloud://main-2gjpci0p59828101.6d61-main-2gjpci0p59828101-1305705970/src/share_logo.jpg'
    }
  },
  onShareTimeline(){
    return{
      imageUrl: 'cloud://main-2gjpci0p59828101.6d61-main-2gjpci0p59828101-1305705970/src/share_logo.jpg'       
        }
    },
})