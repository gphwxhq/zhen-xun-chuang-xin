// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buttons: [{
      id: 0,
      name: '基本信息'
    }, {
      id: 1,
      name: '项目经历'
    }, {
      id: 2,
      name: '职位信息'
    }, {
      id: 3,
      name: '论文及专利'
    }, {
      id: 4,
      name: '其他信息'
    }]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.setData({
      id: options.id
    })
    this.data.buttons[0].checked = true;
    this.setData({
      buttons: this.data.buttons,
    })
    let self = this
    wx.cloud.callFunction({
      name: "searchDB",
      data: {
        id: options.id
      },
      success: function (res) {
        if (res.result == null) {
          console.log(res)
          return
        }
        let data = res.result[0]
        console.log(data)
        wx.setNavigationBarTitle({
          title: data.name
        })
        self.setData({
          link:data.link,
          // achievement: data.achievement,
          // age: data.age,
          // awards: data.awards,
          // birthday: data.birthday,
          // contact: data.contact,
          // course: data.course,
          // direction: data.direction,
          // education: data.education,
          // experience: data.experience,
          // gender: data.gender,
          // graduated: data.graduated,
          // job: data.job,
          // media: data.media,
          name: data.name,
          // nation: data.nation,
          // organization: data.organization,
          // other: data.other,
          // papers: data.papers,
          // patent: data.patent,
          // speech: data.speech,
          // title: data.title,
          subjects: [{"姓名：" : data.name, "性别：" : data.gender, "民族：" : data.nation, "学历：" : data.graduated, "年龄：" : data.age, "出生日期：" : data.birthday, "联系方式：" : data.contact, "研究方向:" : data.direction}, {"指导项目及获奖情况：" : data.awards, "创新创业领域的经历结果和成就:" : data.achievement}, {"工作单位：" : data.organization, "职位:" : data.job, "职称：" : data.title, "毕业院校：" : data.graduated},{"专利：" : data.patent, "论文发表情况:" : data.papers}, {"公开场合发表演讲：" : data.speech, "教育经历:" : data.experience, "个人自媒体:" : data.media, "自建课程:" : data.course, "其他信息：" : data.other}],
        })
        self.setData({
          curSubject:self.data.subjects[0]
        })
        self.show_animate1()
        self.show_animate3()
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  checkOff() {
    for (let i = 0; i < 5; i++) {
      this.data.buttons[i].checked = false;
    }
  },
  show_animate1(){
    this.animate('.checked_button', [
      {height:'210rpx'},
      {height:'270rpx'},
      {height:'260rpx'}
      ], 500, function () {
        this.clearAnimation('.checked_button', function () {
          console.log("清除了动画1")
        })
    }.bind(this))
  },
  show_animate2(id){
    this.animate('.text_container', [
      {opacity:1},
      {opacity:0}
      ], 500, function () {
        this.setData({
          curSubject:this.data.subjects[id]
        })
    }.bind(this))
  },
  show_animate3(){
    this.animate('.text_container', [
      {opacity:0},
      {opacity:1}
      ], 500, function () {
        this.clearAnimation('.text_container', function () {
          console.log("清除了动画23")
        })
    }.bind(this))
  },
  radioButtonTap(e) {
    let id=e.currentTarget.dataset.id
    this.checkOff()
    this.data.buttons[id].checked = true;
    this.setData({
      buttons: this.data.buttons,
    })
    this.show_animate2(id)
    this.show_animate1()
    this.show_animate3()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})