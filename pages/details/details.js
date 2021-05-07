// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buttons: [{
      id: 1,
      name: '基本信息'
    }, {
      id: 2,
      name: '项目经历'
    }, {
      id: 3,
      name: '职位信息'
    }, {
      id: 4,
      name: '论文及专利'
    }, {
      id: 5,
      name: '其他信息'
    }],
    msg: '',
    id: "0191122804",
    name: "爱因斯坦",
    job: "导师职位",
    direction: "提出广义相对论引力方程的完整形式",
    age: 18,
    gender: "男",
    birthday: "010103",
    contact: "15340359661@qq.com",
    nation: "汉族",
    doctor: "博士",
    achievement: "",
    awards: "",
    course: "",
    education: "",
    experience: "",
    graduated: "",
    cuorse: "",
    media: "",
    organization: "",
    other: "",
    papers: "",
    patent: "",
    speech: "",
    title: "",

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
        self.setData({
          link:data.link,
          achievement: data.achievement,
          age: data.age,
          awards: data.awards,
          birthday: data.birthday,
          contact: data.contact,
          course: data.course,
          direction: data.direction,
          education: data.education,
          experience: data.experience,
          gender: data.gender,
          graduated: data.graduated,
          job: data.job,
          media: data.media,
          name: data.name,
          nation: data.nation,
          organization: data.organization,
          other: data.other,
          papers: data.papers,
          patent: data.patent,
          speech: data.speech,
          title: data.title,
          subject1: ["姓名：" + data.name, "性别：" + data.gender, "民族：" + data.nation, "学历：" + data.graduated, "年龄：" + data.age, "出生日期：" + data.birthday, "联系方式：" + data.contact, "研究方向:" + data.direction]
        })

      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  getProjectExperiance() {
    this.setData({
      subject1: ["指导项目及获奖情况：" + this.data.awards, "创新创业领域的经历结果和成就:" + this.data.achievement]
    })

  },
  getJobInformation() {
    this.setData({
      subject1: ["工作单位：" + this.data.organization, "职位:" + this.data.job, "职称：" + this.data.title, "毕业院校：" + this.data.graduated]
    })

  },
  getPaperPatent() {
    this.setData({
      subject1: ["专利：" + this.data.patent, "论文发表情况:" + this.data.papers]
    })

  },
  getOtherInformation() {
    this.setData({
      subject1: ["公开场合发表演讲：" + this.data.speech, "教育经历:" + this.data.experience, "个人自媒体:" + this.data.media, "自建课程:" + this.data.course, "其他信息：" + this.data.other]
    })

  },
  getBasic() {
    this.setData({
      subject1: ["姓名：" + this.data.name, "性别：" + this.data.gender, "民族：" + this.data.nation, "学历：" + this.data.graduated, "年龄：" + this.data.age, "出生日期：" + this.data.birthday, "联系方式：" + this.data.contact, "研究方向:" + this.data.direction]
    })
  },
  checkOff() {
    for (let i = 0; i < 5; i++) {
      this.data.buttons[i].checked = false;
    }
  },
  radioButtonTap1() {
    this.checkOff()
    this.data.buttons[0].checked = true;
    this.setData({
      buttons: this.data.buttons,
    })
    this.setData({
      subject1: ["姓名：" + this.data.name, "性别：" + this.data.gender, "民族：" + this.data.nation, "学历：" + this.data.graduated, "年龄：" + this.data.age, "出生日期：" + this.data.birthday, "联系方式：" + this.data.contact, "研究方向:" + this.data.direction]
    })
  },

  radioButtonTap2() {
    this.checkOff()
    this.data.buttons[1].checked = true;
    this.setData({
      buttons: this.data.buttons,
    })
    this.setData({
      subject1: ["指导项目及获奖情况：" + this.data.awards, "创新创业领域的经历结果和成就:" + this.data.achievement]
    })

  },
  radioButtonTap3() {
    this.checkOff()
    this.data.buttons[2].checked = true;
    this.setData({
      buttons: this.data.buttons,
    })
    this.setData({
      subject1: ["工作单位：" + this.data.organization, "职位:" + this.data.job, "职称：" + this.data.title, "毕业院校：" + this.data.graduated]
    })
  },
  radioButtonTap4() {
    this.checkOff()
    this.data.buttons[3].checked = true;
    this.setData({
      buttons: this.data.buttons,
    })
    this.setData({
      subject1: ["专利：" + this.data.patent, "论文发表情况:" + this.data.papers]
    })
  },
  radioButtonTap5() {
    this.checkOff()
    this.data.buttons[4].checked = true;
    this.setData({
      buttons: this.data.buttons,
    })
    this.setData({
      subject1: ["公开场合发表演讲：" + this.data.speech, "教育经历:" + this.data.experience, "个人自媒体:" + this.data.media, "自建课程:" + this.data.course, "其他信息：" + this.data.other]
    })


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