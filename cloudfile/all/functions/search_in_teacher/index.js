// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "main-2gjpci0p59828101"
})

// 云函数入口函数
exports.main = async (event, context) => {

  try {
    res = await cloud.database().collection("teachers").field({
      "name": true,
      "organization": true,
      "other": true
    }).where({
      "name": event.name
    }).limit(1).get()
      return {
        name: res.data[0].name,
        dep: res.data[0].organization,
        oth: res.data[0].other
      }
  } catch (error) {
    console.log(error);
  }
}