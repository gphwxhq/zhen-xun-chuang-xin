// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "0191122804",
    name: "爱因斯坦",
    job: "导师职位",
    otherinformation: "提出广义相对论引力方程的完整形式",
    otherinfor: "...",
    age: 18,
    sex: "男",
    sub_id: "010103",
    telephone_num: "15340359661@qq.com",
    nation: "汉族",
    doctor: "博士",
    // subject0:[指导项目及获奖情况,创新创业领域的经历结果和成就],
    // subject1:["工作单位","职务","职称","毕业院校"],
    // subject2:["专利","论文发表情况"],
    // subject3:["公开场合发表演讲","教育经历","个人自媒体","自建课程"],
    // temp为临时数据
    temp1: "他为美国丹佛大学国际关系博士，美国哈佛大学商学院参与式个案教学、百森学院（Babson College）创新创业教...",
    temp2: "指导学生创业项目获中国“互联网+”大学生创新创业大赛国赛金奖1项、银奖5项、铜奖5项，广西区赛金奖12项。",
    temp3: "广西师范大学创新创业学院",
    temp41: "院长",
    temp5: "先出院长",
    temp6: "内蒙古大学",
    temp7: "比特币背后的区块链技术",
    temp8: "[1]蒙志明,杨日星.地方高校创新创业教师教学能力评价及提升路径[J];[2]蒙志明,黄娜娜.高校创客空间建设策略与运行机制研究[J];[3]蒙志明,廖芳.基于全过程培养理念的创新创业课程体系建设研究[J];[4]蒙志明.基于创新型艺术人才培养的地方师范院校教学模式创新研究[J];[5]蒙志明.创新创业教育与专业教育的深度融合分析[J];[6]蒙志明.浅论高校毕业生就业追踪反馈体系的探索与构建[J];[7]农荣前,蒙志明,曾晖.高校破解大学毕业生就业困境的思路[J]",
    temp9: "内蒙古大学励志演讲",
    temp10: "华南理工大学创业教育学院任教",
    temp11: "无",
    temp12: "无",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.setData({
      id: options.id
    })
    let self = this
    wx.cloud.callFunction({
      name: "searchDB",
      data: {
        id: options.id
      },
      success: function (res) {
        if (res.result == null)
          console.log(res)
        if (res.result.length != 0) {
          let data=res.result[0]
          console.log(data)
          self.setData({
            name:data.name,
            job: data.job,
            otherinformation:data.other,
            age: data.age,
            sex: data.gender,
            telephone_num:data.contact,
            nation: data.nation,
          })

          console.log(res.data)
        } else {
          // self.setData({
          //   search_state: true,
          //   isfind: false,
          // })
        }
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  getSubject1() {
    this.setData({
      subject1: ["指导项目及获奖情况：" + this.data.temp2, "创新创业领域的经历结果和成就:" + this.data.temp1]
    })

  },
  getSubject2() {
    this.setData({
      subject1: ["工作单位：" + this.data.temp3, "职位:" + this.data.temp41, "职称：" + this.data.temp5, "毕业院校：" + this.data.temp6]
    })

  },
  getSubject3() {
    this.setData({
      subject1: ["专利：" + this.data.temp7, "论文发表情况:" + this.data.temp8]
    })

  },
  getSubject4() {
    this.setData({
      subject1: ["公开场合发表演讲：" + this.data.temp9, "教育经历:" + this.data.temp10, "个人自媒体:" + this.data.temp11, "自建课程:" + this.data.temp12]
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