// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
  },
  jmp_search(){
    wx.navigateTo({
      url: '../searchresult/searchresult',
    })
  },
  click_for_event(){
    wx.navigateTo({
      url: '../event/event',
    })
  },

  getarticles() {
    let self = this
    wx.cloud.callFunction({
      name: "readarticle",
      data: {

      },
      success: function (res) {
        console.log(res)
        self.setData({
          infoList:res.result
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
    this.getarticles()
  },
 
  /**
   * 公众号推文跳转
   */
  toarticles: function (e) {
    var id = e.currentTarget.dataset.id;  // 获取点击的推文的数组下标
    var url = e.currentTarget.dataset.url;  // 通过id判断是哪个推文的链接
    //跳转并传参
    wx.navigateTo({
      url: '/pages/event/event?name=articles&url=' + url,
    })
  },
})