// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "main-2gjpci0p59828101"
})

// 云函数入口函数
exports.main = async (event, context) => {
  let res = await cloud.database().collection("articles").field({
    "picture": true,
    "title": true,
    "_id": true,
    "url": true
  }).get()
  console.log(res.data)
  return res.data
}