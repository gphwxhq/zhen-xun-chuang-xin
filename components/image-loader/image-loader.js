/**
 * 图片预加载组件
 */
Component({
  externalClasses: ['my-class'],
  properties: {
    //默认图片
    // defaultImage: String,
    //原始图片
    src: String,
    width: String,
    height: String,
    //图片剪裁mode，同Image组件的mode
    mode: String
  },
  data: {
    finishLoadFlag: false,
    defaultImage: '/lib/images/default.png'
  },
  methods: {
    finishLoad: function (e) {
      this.setData({
        finishLoadFlag: true
      })
      this.showFadeinImg()
    },
    showFadeinImg() {
      this.animate('.my-class', [{
          opacity: 0
        },
        {
          opacity: 1
        }
      ], 1000, function () {
        this.clearAnimation('.my-class', function () {
          console.log("清除了my-class上的动画")
        })
      }.bind(this))
    },
  },
})