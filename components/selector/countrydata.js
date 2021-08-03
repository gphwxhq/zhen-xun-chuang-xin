const citys = [
  {
    "orgId": "1",//城市id
    "name": "安徽省",//城市名字
    "simplepinyin": "A",//首字母
    "isshowletter": true//是否显示首字母
  },
  {
    "orgId": "2",//城市id
    "name": "澳门特别行政区",//城市名字
    "simplepinyin": "A",//首字母
    "isshowletter": false//是否显示首字母
  },
  {
    "orgId": "3",//城市id
    "name": "北京市",//城市名字
    "simplepinyin": "B",//首字母
    "isshowletter": true//是否显示首字母
  },
  {
    "orgId": "4",//城市id
    "name": "重庆市",//城市名字
    "simplepinyin": "C",//首字母
    "isshowletter": true//是否显示首字母
  },
  {
    "orgId": "5",//城市id
    "name": "福建省",//城市名字
    "simplepinyin": "F",//首字母
    "isshowletter": true//是否显示首字母
  },
  {
    "orgId": "6",//城市id
    "name": "广东省",//城市名字
    "simplepinyin": "G",//首字母
    "isshowletter": true//是否显示首字母
  },
  {
    "orgId": "7",//城市id
    "name": "贵州省",//城市名字
    "simplepinyin": "G",//首字母
    "isshowletter": false//是否显示首字母
  },
  {
    "orgId": "8",//城市id
    "name": "甘肃省",//城市名字
    "simplepinyin": "G",//首字母
    "isshowletter": false//是否显示首字母
  },
  {
    "orgId": "9",//城市id
    "name": "广西壮族自治区",//城市名字
    "simplepinyin": "G",//首字母
    "isshowletter": false//是否显示首字母
  },
  {
    "orgId": "10",//城市id
    "name": "河北省",//城市名字
    "simplepinyin": "H",//首字母
    "isshowletter": true//是否显示首字母
  },
  {
    "orgId": "11",//城市id
    "name": "黑龙江省",//城市名字
    "simplepinyin": "H",//首字母
    "isshowletter": false//是否显示首字母
  },
  {
    "orgId": "12",//城市id
    "name": "河南省",//城市名字
    "simplepinyin": "H",//首字母
    "isshowletter": false//是否显示首字母
  },
  {
    "orgId": "13",//城市id
    "name": "湖北省",//城市名字
    "simplepinyin": "H",//首字母
    "isshowletter": false//是否显示首字母
  },
  {
    "orgId": "14",//城市id
    "name": "湖南省",//城市名字
    "simplepinyin": "H",//首字母
    "isshowletter": false//是否显示首字母
  },
  {
    "orgId": "15",//城市id
    "name": "海南省",//城市名字
    "simplepinyin": "H",//首字母
    "isshowletter": false//是否显示首字母
  },
  {
    "orgId": "16",//城市id
    "name": "吉林省",//城市名字
    "simplepinyin": "J",//首字母
    "isshowletter": true//是否显示首字母
  },
  {
    "orgId": "17",//城市id
    "name": "江苏省",//城市名字
    "simplepinyin": "J",//首字母
    "isshowletter": false//是否显示首字母
  },
  {
    "orgId": "18",//城市id
    "name": "江西省",//城市名字
    "simplepinyin": "J",//首字母
    "isshowletter": false//是否显示首字母
  },
  {
    "orgId": "19",//城市id
    "name": "辽宁省",//城市名字
    "simplepinyin": "L",//首字母
    "isshowletter": true//是否显示首字母
  },
  {
    "orgId": "20",//城市id
    "name": "内蒙古自治区",//城市名字
    "simplepinyin": "N",//首字母
    "isshowletter": true//是否显示首字母
  },
  {
    "orgId": "21",//城市id
    "name": "宁夏回族自治区",//城市名字
    "simplepinyin": "N",//首字母
    "isshowletter": false//是否显示首字母
  },
  {
    "orgId": "22",//城市id
    "name": "青海省",//城市名字
    "simplepinyin": "Q",//首字母
    "isshowletter":true//是否显示首字母
  },
  {
    "orgId": "23",//城市id
    "name": "山西省",//城市名字
    "simplepinyin": "S",//首字母
    "isshowletter":true//是否显示首字母
  },
  {
    "orgId": "24",//城市id
    "name": "山东省",//城市名字
    "simplepinyin": "S",//首字母
    "isshowletter":false//是否显示首字母
  },
  {
    "orgId": "25",//城市id
    "name": "四川省",//城市名字
    "simplepinyin": "S",//首字母
    "isshowletter":false//是否显示首字母
  },
  {
    "orgId": "26",//城市id
    "name": "陕西省",//城市名字
    "simplepinyin": "S",//首字母
    "isshowletter":false//是否显示首字母
  },
  {
    "orgId": "27",//城市id
    "name": "上海市",//城市名字
    "simplepinyin": "S",//首字母
    "isshowletter":false//是否显示首字母
  },
  {
    "orgId": "28",//城市id
    "name": "台湾省",//城市名字
    "simplepinyin": "T",//首字母
    "isshowletter":true//是否显示首字母
  },
  {
    "orgId": "29",//城市id
    "name": "天津市",//城市名字
    "simplepinyin": "T",//首字母
    "isshowletter":false//是否显示首字母
  },
  {
    "orgId": "30",//城市id
    "name": "西藏自治区",//城市名字
    "simplepinyin": "X",//首字母
    "isshowletter":true//是否显示首字母
  },
  {
    "orgId": "31",//城市id
    "name": "新疆维吾尔自治区",//城市名字
    "simplepinyin": "X",//首字母
    "isshowletter":false//是否显示首字母
  },
  {
    "orgId": "32",//城市id
    "name": "香港特别行政区",//城市名字
    "simplepinyin": "X",//首字母
    "isshowletter":false//是否显示首字母
  },
  {
    "orgId": "33",//城市id
    "name": "云南省",//城市名字
    "simplepinyin": "Y",//首字母
    "isshowletter":true//是否显示首字母
  },
  {
    "orgId": "34",//城市id
    "name": "浙江省",//城市名字
    "simplepinyin": "Z",//首字母
    "isshowletter":true//是否显示首字母
  },
  ]
  //暴露给外部使用
  module.exports = {
  citys: citys
  }