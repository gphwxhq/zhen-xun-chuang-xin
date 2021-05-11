// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "main-2gjpci0p59828101"
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  res = await cloud.database().collection('mottos')
  .aggregate()
  .project({
    _id: 0
  })
  .sample({
    size: 1
  })
  .end()
  return res.list[0].value
}