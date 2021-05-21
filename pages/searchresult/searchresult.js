// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    searchState: true,
    isFind: false,
    firstState: true,
    resultList: [],
    pageNum: 1,
    isFinish: false,
    afterSearchState: false,
  },
  onLoad:function (options) {
    this.setData({
      mode:options.mode
    })
    wx.setNavigationBarTitle({
      title: options.mode==0?"导师查询":"项目查询"
    })
    
  },
  searchBox(e) {
    let search_name = e.detail.value.search_item == null ? e.detail.value : e.detail.value.search_item
    if (search_name == '') {
      wx.showToast({
        title: '请输入内容',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return
    }
    this.setData({
      searchName: search_name,
      searchState: false,
      isFind: false,
      firstState: false,
      resultList: [],
      pageNum: 1,
      isFinish: false,
      afterSearchState: false,
      searchParams:['searchDB','getContest']
    })
    let self = this
    wx.cloud.callFunction({
      name: self.data.searchParams[self.data.mode],
      data: {
        name: search_name,
        pageNum: self.data.pageNum
      },
      success: function (res) {
        if (res.result == null) {
          console.log(res)
          return
        }
        if (res.result[0].length != 0) {
          // console.log(res)
          if (res.result[0].length < res.result[1])
            self.setData({
              isFinish: true
            })
          self.setData({
            searchState: true,
            isFind: true,
            // name: res.result.name,
            // dep: res.result.dep,
            // oth: res.result.oth 
            resultList: self.data.resultList.concat(res.result[0])
          })

          // console.log(self.data.resultList)
        } else {
          self.setData({
            searchState: true,
            isFind: false,
          })
        }
      },
      fail: function (res) {
        console.log(res)
        self.setData({
          searchState: true,
          isFind: false,
        })
      }
    })
    // wx.navigateTo({
    //   url: '../details/details?name='+search_name,
    // })
  },
  click_for_detail(e) {
    if(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../details/details?id=' + e.currentTarget.dataset.id,
    })
    else if( e.currentTarget.dataset.url)
      wx.navigateTo({
        url: '../event/event?url='+ e.currentTarget.dataset.url
      })
    },
  onReachBottom: function () {
    // console.log('on')
    if (this.data.isFinish || !this.data.isFind||this.data.afterSearchState)
      return
    this.setData({
      pageNum: this.data.pageNum += 1,
      afterSearchState: true
    })
    // console.log(this.data.pageNum)
    let self = this
    wx.cloud.callFunction({
      name: self.data.searchParams[self.data.mode],
      data: {
        name: self.data.searchName,
        pageNum: self.data.pageNum
      },
      success: function (res) {
        // console.log(res)
        if (res.result == null) {
          console.log(res)
          return
        }
        if (res.result[0].length != 0) {
          // console.log(res)
          if (res.result[0].length < res.result[1])
            self.setData({
              isFinish: true
            })
          self.setData({
            resultList: self.data.resultList.concat(res.result[0]),
            afterSearchState: false
          })
          // console.log(self.data.resultList)
        } else {
          self.setData({
            isFinish: true,
            afterSearchState: false
          })
        }
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },

})