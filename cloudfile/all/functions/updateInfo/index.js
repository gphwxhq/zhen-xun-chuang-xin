// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "main-2gjpci0p59828101"
})


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command
  if (event.mode == '0') {
    let r=await db.collection('submits')
      .where({
        _openid: wxContext.OPENID,
        state:0
      }).count()
    if(r.total>2){
      return{
        success:false,
        mode:event.mode
      }
    }
    await db.collection('submits').add({
      data: {
        _openid: wxContext.OPENID,
        updateDate: new Date(),
        data:event.info,
        state:0,
        comment:''
      }
    })
  }
  else if(event.mode=='1'){
    event.info['updateTime']=new Date()
    await db.collection('users').doc(wxContext.OPENID)
      .update({
        data: {
         draft: event.info
        },
      })
  }else if(event.mode=='2'){
    await db.collection('submits').doc(event.id).remove()
  }else if(event.mode=='3'){
    await db.collection('submits').doc(event.id)
      .update({
        data: {
         data: event.info,
         updateDate: new Date(),
         state:0
        },
      })
  }
  return{
    success:true,
    mode:event.mode
  }
}