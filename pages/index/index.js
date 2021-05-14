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
  getarticles: function () {
    var that = this
    db.collection('index').get({
      success(res) {
        that.setData({
          articles: res.data.reverse(),  // 使最新推文在上面
        })
      }
    })
  },
 
  /**
   * 公众号推文跳转
   */
  toarticles: function (e) {
    var id = e.currentTarget.dataset.id;  // 获取点击的推文的数组下标
    var url = this.data.index[id].url;  // 通过id判断是哪个推文的链接
    //跳转并传参
    wx.navigateTo({
      url: '/pages/events/events?name=articles&url=' + url,
    })
  },
})