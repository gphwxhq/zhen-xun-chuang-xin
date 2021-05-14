// pages/findmore/findmore.js
Page({
  get_address(){
    let self=this
    wx.getLocation({
      type: 'wgs84',
      success (res) {
        const latitude = res.latitude
        const longitude = res.longitude
        console.log(res)

        wx.request({
          url: 'https://api.map.baidu.com/reverse_geocoding/v3/', //仅为示例，并非真实的接口地址
          data: {
            ak: 'N1jI4G0nT0aDeMYLQQLfxGTTcO7MzoIa',
            output: 'json',
            coordtype:'wgs84ll',
            location:latitude+','+longitude
          },
          success (res) {
            console.log(res)
            self.setData({
              isGetProvince:true,
              province:res.data.result.addressComponent.province
            })
            console.log(self.data.province)
          }
        })
      },
      fail(res){
        console.log(res)
        self.setData({
          isGetProvince:false
        })
      }
     })
  },
  onShow: function (options) {
    this.get_address()
  },
})