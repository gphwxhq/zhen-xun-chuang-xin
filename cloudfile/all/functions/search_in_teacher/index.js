// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"main-2gjpci0p59828101"
})

// 云函数入口函数
exports.main = async (event, context) => {
  try{
    res=await cloud.database().collection("teachers").field({
    "学者名单":true,
    "工作单位":true,
    "其他":true
  }).where({
       "学者名单":event.name
  }).limit(1).get()
  return{
    name:res.data[0].学者名单,
    dep:res.data[0].工作单位,
    oth:res.data[0].其他
  }
  }
  catch (error) {
    console.log(error);
  }
}