// components/selector/selector.js
var timer;
var items = require('/countrydata.js'); //引入我们的城市列表资源
var that;
var touchEndy = 0; //页面增加y坐标属性定义
var rightheight = 0; //索引条高度

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    letters: ['热门', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    citys: [], //增加属性
    toView: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // touchStart: function (e) {
    //   console.log('touchStart start ');
    //   touchEndy = e.touches[0].pageY;
    //   console.log('touchStart end ');
    // },
    touchStart: function (e) {
      // console.log('touchStart start ');
      touchEndy = e.touches[0].pageY- 49
      // - this.fixedTop;
      // console.log('touchStart end ');
    },
    touchMove: function (e) {
      touchEndy = e.touches[0].pageY - 49;
      var lindex = parseInt(touchEndy / rightheight * 27); //根据前面分析获取手指触摸位置在letters中的index值
      var value = this.data.letters[lindex];
      var isShow = that.dialog.getDialogState();
      if('定位' != value){
        this.showOrHideLetterDialog(isShow, value, false);
      }
      // console.log(" touchMove touchEndy : " + touchEndy + " lindex : " + lindex + " value : " + value);
    },
    //右侧索引表点击事件
    letterclick: function (e) {
      var letter = e.currentTarget.dataset.letter;
      var isShow = that.dialog.getDialogState();
      if ('定位' == letter) {//点击定位滚动到顶部
        that.setData({
          toView: 'dw',
        })
      } else {
        //不是点击定位，弹出触摸的字母
        this.showOrHideLetterDialog(isShow, letter, true);
        that.setData({//定位到字母所在城市item
          toView: letter,
        })
      }
      // console.log('letterclick letter : ' + letter);
    },
    startTime: function (autodimiss) {
      //1500毫秒之后弹框自动消失
      if (autodimiss) {
        var timer = setTimeout(function () {
          that.dialog.hideDialog();
        }, 1500)
      }
    },
    touchEnd: function (e) {
      var lindex = parseInt(touchEndy / rightheight * 27);
      var value = this.data.letters[lindex];
      var isShow = that.dialog.getDialogState();
      if ('定位' == value) {
        that.setData({
          toView: 'dw',
        })
      } else {
        //不是点击定位，弹出触摸的字母
        this.showOrHideLetterDialog(isShow, value, true);
        that.setData({
          toView: value,
        })
      }
      // console.log("touchEnd touchEndy : " + touchEndy + " lindex : " + lindex + " value : " + value);
    },
    showOrHideLetterDialog: function (isShow, letter, autodimss) {
      if (!isShow) {
        that.dialog.setLetter(letter);
        that.dialog.showDialog();
        this.startTime(autodimss);
      } else {
        clearTimeout(timer);
        this.startTime(autodimss);
        that.dialog.setLetter(letter);
      }
    },
    selectcity: function(e) {
      // var orgid = e.currentTarget.dataset.orgid
      // var orgname = e.currentTarget.dataset.orgname
      wx.navigateTo({
        url: '../detailed_news/detailed_news?title=导师信息&functionName=searchDB&params={"province":"' + e.currentTarget.dataset.orgname + '","pageNum":1}',
      })
    }
  },
  attached: function () {
    // 在组件实例进入页面节点树时执行
    that = this,
      that.setData({
        citys: items.citys
      })
  },
  ready() {
    this.dialog = this.selectComponent("#dialog");
    var query = this.createSelectorQuery(); //创建节点选择器
    query.select('#right').boundingClientRect()
    query.exec(function (res) {
      //res就是 所有标签为mjltest的元素的信息 的数组
      // console.log(res);
      //取高度
      // console.log("height : " + res[0].height);
      rightheight = res[0].height;
    })
  }
})