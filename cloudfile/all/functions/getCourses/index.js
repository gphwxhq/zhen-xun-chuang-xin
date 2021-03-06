// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "main-2gjpci0p59828101"
})

// 云函数入口函数
exports.main = async (event, context) => {
  let pageInterval = 8
  let mskip = event.pageNum > 1 ? (event.pageNum - 1) * pageInterval : 0
  let res = await cloud.database().collection("courses").field({
    "img": true,
    "title": true,
    "_id": true,
  }).limit(pageInterval).skip(mskip).get()
  return res.data
}