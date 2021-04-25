// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    search_state: true,
    isfind: false,
    firstState: true
  },
  searchBox(e) {
    let search_name = e.detail.value.search_item
    if (search_name == ''){
      wx.showToast({
        title: '请输入内容',
        icon:'none',
        duration: 1000,
        mask:true
    })
      return
    }
    this.setData({
      search_state: false,
      isfind: false,
      firstState: false
    })
    let self = this
    wx.cloud.callFunction({
      name: "search_in_teacher",
      data: {
        name: search_name
      },
      success: function (res) {
        if (res.result != null) {
          self.setData({
            search_state: true,
            isfind: true,
            name: res.result.name,
            dep: res.result.dep,
            oth: res.result.oth
          })
        } else {
          self.setData({
            search_state: true,
            isfind: false,
          })
        }
      },
      fail: function (res) {
        console.log(res)
      }
    })
  }

})