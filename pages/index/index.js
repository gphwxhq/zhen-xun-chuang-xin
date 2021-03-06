// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    isContainerEmpty:false 
  },
  jmp_search() {
    wx.navigateTo({
      url: '../searchresult/searchresult?mode=0',
    })
  },
  click_for_event() {
    wx.navigateTo({
      url: '../event/event',
    })
  },
  jump_news() {
    wx.navigateTo({
      url: '../detailed_news/detailed_news?title=动态&functionName=readarticle&params={"pageNum":1}',
    })
  },
  getarticles() {
    let self = this
    wx.cloud.callFunction({
      name: "readarticle",
      data: {
        pageNum: 0
      },
      success: function (res) {
        self.setData({
          infoList: res.result[0]
        })

      },
      fail: function (res) {
        self.setData({ 
          isContainerEmpty:true 
        }) 
        console.log(res)
      }
    })
  },

  onLoad: function (options) {
    this.getarticles()
  },
  onPullDownRefresh:function(){
    this.setData({
      isContainerEmpty:false 
    })
    this.onLoad()
    wx.stopPullDownRefresh()
  },
  /**
   * 公众号推文跳转
   */
  toarticles: function (e) {
    var id = e.currentTarget.dataset.id; // 获取点击的推文的数组下标
    var url = e.currentTarget.dataset.url; // 通过id判断是哪个推文的链接
    //跳转并传参
    wx.navigateTo({
      url: '../event/event?url=' + url,
    })
  },
  click_for_message(e) {
    // let url = 'https://mp.weixin.qq.com/s/yQpKosfpv80Q47WggnXqbQ'
    // wx.navigateTo({
    //   url: '../event/event?url=' + url,
    // })
    wx.navigateTo({
      url: '../searchresult/searchresult?mode=1',
    })
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