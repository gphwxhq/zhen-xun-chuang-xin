// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "main-2gjpci0p59828101"
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  let pageInterval = 16
  let mskip = event.pageNum > 1 ? (event.pageNum - 1) * pageInterval : 0
  let res = await db.collection("contests").where({
    "name": db.RegExp({
      regexp: '.*' + event.name,
      options: 'i'
    })
  }).limit(pageInterval).skip(mskip).get()
  return [res.data,pageInterval]
}