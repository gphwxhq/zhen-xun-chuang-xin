// 云函数入口文件
const cloud = require('wx-server-sdk')


cloud.init({
  env: "main-2gjpci0p59828101"
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let pageInterval = 7
  if (event.pageNum != null && event.name != null) {
    let mskip = event.pageNum > 1 ? (event.pageNum - 1) * pageInterval : 0
    var res = await db.collection("teachers").field({
      "name": true,
      "organization": true,
      "_id": true,
      "link": true
    }).where(db.command.or([{
        "name": db.RegExp({
          regexp: '.*' + event.name,
          options: 'i'
        })
      },
      {
        "direction": db.RegExp({
          regexp: '.*' + event.name,
          options: 'i'
        })
      },
      {
        "area": db.RegExp({
          regexp: '.*' + event.name,
          options: 'i'
        })
      },
    ])).limit(pageInterval).skip(mskip).get()
  } else if (event.id != null) {
    var res = await cloud.database().collection("teachers").where({
      "_id": event.id
    }).limit(1).get()
  } else if (event.province != null) {
    var res = await cloud.database().collection("teachers").where({
      "area": event.province
    }).get()
  } else
    return null
  return res.data
}