// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    search_state: true,
    isfind: false,
    firstState: true,
    resultList:[],
    pageNum:1
  },
  searchBox(e) {
    let search_name = e.detail.value.search_item==null?e.detail.value:e.detail.value.search_item
    if (search_name == ''){
      wx.showToast({
        title: '请输入内容',
        icon:'none',
        duration: 1000,
        mask:true
    })
      return
    }
    if(this.data.pageNum==1){
      this.setData({
        resultList:[]
      })
    }
    this.setData({
      search_state: false,
      isfind: false,
      firstState: false
    })
    let self = this
    wx.cloud.callFunction({
      name: "searchDB",
      data: {
        name: search_name,
        pageNum:self.data.pageNum
      },
      success: function (res) {
        if (res.result==null)
        console.log(res)
        if (res.result.length!=0) {
          // console.log(res)
          self.setData({
            search_state: true,
            isfind: true,
            // name: res.result.name,
            // dep: res.result.dep,
            // oth: res.result.oth 
            resultList:self.data.resultList.concat(res.result)
          })
         
          console.log( self.data.resultList)
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
    // wx.navigateTo({
    //   url: '../details/details?name='+search_name,
    // })
  },
  click_for_detail(e){
    wx.navigateTo({
      url: '../details/details?id='+e.currentTarget.dataset.id,
    })
  }

})