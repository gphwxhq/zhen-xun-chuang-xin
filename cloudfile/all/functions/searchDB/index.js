// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "main-2gjpci0p59828101"
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if (event.pageNum != null && event.name != null) {
    let mskip = event.pageNum > 1 ? (event.pageNum - 1) * 10 : 0
    var res = await cloud.database().collection("teachers").field({
      "name": true,
      "organization": true,
      "_id": true
    }).where({
      "name": {
        $regex: '.*' + event.name,
        $options: 'i'
      }
    }).limit(10).skip(mskip).get()
  } else if (event.id != null) {
    var res = await cloud.database().collection("teachers").where({
      "_id":event.id
    }).limit(1).get()
  } else
    return null
  return res.data
}