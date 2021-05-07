// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
  },
  jmp_search(){
    wx.navigateTo({
      url: '../searchresult/index',
    })
  }
})