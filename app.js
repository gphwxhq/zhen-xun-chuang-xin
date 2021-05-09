// app.js
App({
  onLaunch(){
    wx.cloud.init({
      env:"main-2gjpci0p59828101"
    })
  },
  tabChange(e) {
    console.log('tab change', e)
}
})
