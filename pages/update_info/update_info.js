// pages/update_info/update_info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photoList:[],
    subjects: [{
      "姓名：(必填)": "name",
      "学历：": "graduated",
      "联系方式：(必填)": "contact",
      "研究方向:": "direction",
      // "照片链接": "link"
    }, {
      "指导项目及获奖情况：": "awards",
      "创新创业领域的经历结果和成就:": "achievement"
    }, {
      "工作单位：": "organization",
      "职位:": "job",
      "职称：": "title",
      "毕业院校：": "graduated"
    }, {
      "专利：": "patent",
      "论文发表情况:": "papers"
    }, {
      "公开场合发表演讲：": "speech",
      "教育经历:": "experience",
      "个人自媒体:": "media",
      "自建课程:": "course",
      "其他信息：": "other"
    }],
    index: ['基本信息', '项目经历', '职位信息', '论文及专利', '其他信息'],
    saveWorking: false,
    submitWorking: false,
    tipColor: 'red',
    success:false
  },
  handleUpload(res){
    // console.log(res)
    let self=this
    console.log(this.data.photoList)
    if(this.data.photoList.length>0&&this.data.photoList[0].slice(0,5)=='cloud'&&res.detail.uploaderList.length==0){
      wx.cloud.deleteFile({
        fileList: self.data.photoList,
        success: res => {
          // handle success
          console.log(res.fileList)

          wx.cloud.callFunction({
            name: "updateInfo",
            //0提交，1草稿,2删除,3更新
            data: {
              mode: 1,
              info: {
                link:''
              },
              id:null
            },
            success: function (res) {
              self.setData({
                photoList:[]
              })
            },
            fail: function (res) {
              console.log(res)
            }
          })
        },
        fail: err => {
          console.log(err)
        },
      })
    }
    else
    self.setData({
      photoList:res.detail.uploaderList
    })
  },
  checkState(res) {
    // console.log(res)
    if (res.currentTarget.dataset.id == "name"){
      if(res.detail.value == ""){
        this.showTip('姓名不能为空')
      }
      else if (!(/^[\u4E00-\u9FA5A-Za-z]+$/.test(res.detail.value))) {
        this.showTip('姓名不符合规则')
      }
    }
    else if (res.currentTarget.dataset.id == "contact" && res.detail.value == "")
      this.showTip('联系方式不能为空')
  },
  showTip(text, time = 1000) {
    this.setData({
      tipInfo: text
    })
    let self = this
    this.animate('.tip', [{
        opacity: 0
      },
      {
        opacity: 1
      }
    ], 200, function () {
      setTimeout(function () {
        self.animate('.tip', [{
            opacity: 1
          },
          {
            opacity: 0
          }
        ], 200, function () {
          self.clearAnimation('.tip', function () {
            if (self.data.tipColor != 'red')
              self.setData({
                tipColor: 'red'
              })
            // console.log("清除了tip上的动画")
          })
        })
      }, time)
    })
  },
  async doUpload(mlist){
    let self=this
    console.log(self.data.photoList,self.data.photoList.length>0&&self.data.photoList[0].slice(0,5)!='cloud')
    if(self.data.photoList.length>0&&self.data.photoList[0].slice(0,5)!='cloud'){
       let res=await wx.cloud.uploadFile({
        cloudPath: "upload/" + self.data.photoList[0].split('/')[3],
        filePath: self.data.photoList[0], // 文件路径
      })
        // get resource ID
        console.log(res)
        mlist['link']= res.fileID
    }
    else
      mlist['link']=''
    return mlist
  },
  submitInfo(res) {
    // console.log(res)
    let mlist = res.detail.value
    console.log(mlist)
    if(mlist.name == ""){
      this.showTip('姓名不能为空')
      return
    }
    else if (!(/^[\u4E00-\u9FA5A-Za-z]+$/.test(mlist.name))) {
      this.showTip('姓名不符合规则')
      return
    }
    else if (mlist.contact== ""){
      this.showTip('联系方式不能为空')
      return
    }
    this.setData({
      submitWorking: res.detail.target.dataset.type == 0 ? true : false,
      saveWorking: res.detail.target.dataset.type == 1 ? true : false
    })
    wx.showLoading({
      title: '提交中',
    })
    let self = this
    let ress=res
    this.doUpload(mlist).then(res => {
      console.log(res)
      wx.cloud.callFunction({
        name: "updateInfo",
        //0提交，1草稿,2删除,3更新
        data: {
          mode: ress.detail.target.dataset.type==0?self.data.mode==0?0:3:1,
          info: res,
          id:self.data.id
        },
        success: function (res) {
          self.setData({
            submitWorking: false,
            saveWorking: false
          })
          if (res.result.success) {
            let text=res.result.mode=='0'||res.result.mode=='3'?'提交':'保存'
            wx.hideLoading({
              success: (res) => {
                self.setData({
                  tipColor:'green'
                })
                self.showTip(text+'成功')
                if(text=='提交'){
                  self.setData({
                  success:true
                })
                }
              },
            })
          } else {
            wx.hideLoading({
              success: (res) => {
                self.showTip('提交失败，每个账号至多存在3个申请')
              },
            })
          }
  
          console.log(res)
        },
        fail: function (res) {
          console.log(res)
        }
      })
  })　
    
    
  },
  getDraft() {
    let self = this
    wx.cloud.callFunction({
      name: "getSubmits",
      //0提交，1草稿
      data: {
        mode:1
      },
      success: function (res) {
        console.log(res)
        self.setData({
          mode:0,
          draft: res.result,
          photoList:!res.result.link||res.result.link==''?[]:[res.result.link]
        })
        console.log(self.data.draft,self.data.photoList)
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.data==null)
      this.getDraft()
    else{
      // console.log(JSON.parse(options.data))
      let d=JSON.parse(options.data)
      console.log(d)
      this.setData({
        id:d._id,
        draft:d.data,
        photoList:!d.data.link||d.data.link==''?[]:[d.data.link],
        mode:1
      })
    }
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

})