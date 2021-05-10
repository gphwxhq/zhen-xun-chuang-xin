// app.js
App({
  globalData:{
    themeColor:'#35A4FF'
  },
  onLaunch(){
    wx.cloud.init({
      env:"main-2gjpci0p59828101"
    })
  },
  tabChange(e) {
    console.log('tab change', e)
}
})
