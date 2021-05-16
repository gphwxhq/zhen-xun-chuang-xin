// pages/findmore/findmore.js
Page({
  data:{
    isGetProvince:false,
    isContainerEmpty:false
  },
  jump_news(){
    wx.navigateTo({
      url: '../detailed_news/detailed_news?title=动态&functionName=readarticle&params={"pageNum":1}',
    })
  }, 
  toarticles: function (e) {
    var id = e.currentTarget.dataset.id;  // 获取点击的推文的数组下标
    var url = e.currentTarget.dataset.url;  // 通过id判断是哪个推文的链接
    //跳转并传参
    wx.navigateTo({
      url: '../event/event?url=' + url,
    })
  },
  getarticles() {
    let self = this
    wx.cloud.callFunction({
      name: "readarticle",
      data: {
        pageNum:1
      },
      success: function (res) {
        self.setData({
          infoList:res.result
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
  get_address() {

    let self = this
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        console.log(res)

        wx.request({
          url: 'https://api.map.baidu.com/reverse_geocoding/v3/', //仅为示例，并非真实的接口地址
          data: {
            ak: 'N1jI4G0nT0aDeMYLQQLfxGTTcO7MzoIa',
            output: 'json',
            coordtype: 'wgs84ll',
            location: latitude + ',' + longitude
          },
          success(res) {
            console.log(res)
            self.setData({
              isGetProvince: true,
              province: res.data.result.addressComponent.province
            })
            console.log(self.data.province)
            wx.cloud.callFunction({
              name: "searchDB",
              data: {
                province: self.data.province,
                pageNum: 1
              },
              success: function (res) {
                // console.log(res)
                if (res.result == null) {
                  console.log(res)
                  return
                }
                if (res.result.length != 0) {
                  console.log(res)
                  self.setData({
                    resultList: res.result
                  })
                }
              },
              fail: function (res) {
                console.log(res)
                self.setData({
                  isGetProvince: false
                })
              }
            })
          },
          fail:function(res) {
            console.log(res)
            self.setData({
              isGetProvince: false
            })
          }
        })
      },
      fail(res) {
        console.log(res)
        self.setData({
          isGetProvince: false
        })
      }
    })


  },
  onLoad: function (options) {
    this.get_address()
    this.getarticles()
  },
  click_for_detail(e) {
    wx.navigateTo({
      url: '../details/details?id=' + e.currentTarget.dataset.id,
    })
  },
  jump_teachers() {
    if (!this.data.isGetProvince)
      return
    wx.navigateTo({
      url: '../detailed_news/detailed_news?title=导师信息&functionName=searchDB&params={"province":"' + this.data.province + '","pageNum":1}',
    })
  },
  to_tips(e){
    wx.navigateTo({
      url: '../event/event',
    })
  }
})