// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "main-2gjpci0p59828101"
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  if (event.mode == 0) {
    let res = await db.collection("submits").where({
      _openid: wxContext.OPENID,
    }).field({
      "_id": true,
      "data": true,
      "state": true,
      "updateDate": true
    }).orderBy('state', 'asc').get()
    return [res.data, 3]
  } else if (event.mode == 1) {
    try {
      let res = await db.collection("users").doc(wxContext.OPENID).field({
        "draft": true,
      }).get()
      return res.data.draft
    } catch (e) {
      return null
    }
  }


}