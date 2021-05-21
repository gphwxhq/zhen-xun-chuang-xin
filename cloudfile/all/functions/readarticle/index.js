// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "main-2gjpci0p59828101"
})

// 云函数入口函数
exports.main = async (event, context) => {
  let pageInterval = event.pageNum==0?5:10
  let mskip = event.pageNum > 1 ? (event.pageNum - 1) * pageInterval : 0
  let res = await cloud.database().collection("articles").field({
    "picture": true,
    "title": true,
    "_id": true,
    "url": true
  }).orderBy('update_time', 'desc').limit(pageInterval).skip(mskip).get()
  return [res.data,pageInterval]
}