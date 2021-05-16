// pages/findmore/findmore.js
Page({
  data: {
    isGetProvince: false,
    isContainerEmpty: false
  },
  onAddToFavorites(res) {
    // webview 页面返回 webViewUrl
    console.log('webViewUrl: ', res.webViewUrl)
    return {
      title: '自定义标题',
      imageUrl: '../../lib/images/tip_3.png',
      query: 'name=xxx&age=xxx',
    }
  },
  onShareAppMessage(option){
    // const promise = new Promise(resolve => {
    //   setTimeout(() => {
    //     resolve({
    //       title: '自定义转发标题'
    //     })
    //   }, 2000)
    // })
    // return {
    //   title: '自定义转发标题',
    //   //path: '/page/user?id=123',
    //   promise 
    // }
    let shareObj = {
      　　　　title: "转发的标题",        
      　　　　path: '/pages/share/share',        
      　　　　imageUrl: '../../lib/images/tip_3.png',  
      　　　　success: function(res){
      　　　　　　// 转发成功之后的回调
      　　　　　　if(res.errMsg == 'shareAppMessage:ok'){
      　　　　　　}
      　　　　},
      　　　　fail: function(){
      　　　　　　// 转发失败之后的回调
      　　　　　　if(res.errMsg == 'shareAppMessage:fail cancel'){
      　　　　　　　　// 用户取消转发
      　　　　　　}else if(res.errMsg == 'shareAppMessage:fail'){
      　　　　　　　　// 转发失败，其中 detail message 为详细失败信息
      　　　　　　}
      　　　　}
    }
    if(e.from=='button'){
      let eData = options.target.dataset;
　　　　console.log( eData.name );     // shareBtn
　　　　// 此处可以修改 shareObj 中的内容
　　　　shareObj.path = '/pages/btnname/btnname?btn_name='+eData.name;
    }
    return shareObj;
  },
  onShareTimeline:function(){
    return{
        title: "文字",
        imageUrl:"图片地址"
        }
    },
  jump_news() {
    wx.navigateTo({
      url: '../detailed_news/detailed_news?title=动态&functionName=readarticle&params={"pageNum":1}',
    })
  },
  toarticles: function (e) {
    var id = e.currentTarget.dataset.id; // 获取点击的推文的数组下标
    var url = e.currentTarget.dataset.url; // 通过id判断是哪个推文的链接
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
        pageNum: 1
      },
      success: function (res) {
        self.setData({
          infoList: res.result
        })
      },
      fail: function (res) {
        self.setData({
          isContainerEmpty: true
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
          fail: function (res) {
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
  to_tip_1(e) {
    let url = 'https://mp.weixin.qq.com/mp/homepage?__biz=MzI5ODM1OTI5NA==&hid=11&sn=a3c2e8ccd62ba13c39ef173b482f44fa&scene=18#wechat_redirect'
    wx.navigateTo({
      url: '../event/event?url=' + url,
    })
  },
  to_tip_2(e) {
    let url = 'https://mp.weixin.qq.com/s/GKn1BW318qoT0ZDDRg49EA'
    wx.navigateTo({
      url: '../event/event?url=' + url,
    })
  },
  to_tip_3(e) {
    wx.navigateTo({
      url: '../detailed_news/detailed_news?title=动态&functionName=readarticle&params={"pageNum":1}',
    })
  }
})