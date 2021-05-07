// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    search_state: true,
    isfind: false,
    firstState: true
  },
  jmp_search(){
    wx.navigateTo({
      url: '../searchresult/index',
    })
  }
})