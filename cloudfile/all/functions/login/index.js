// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "main-2gjpci0p59828101"
})


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  // console.log(wxContext)
  try {
    let user = await db.collection("users").doc(wxContext.OPENID).field({
      "_id": true,
      "role": true,
      "nickName": true,
      "avatar": true,
      "lastUpdate": true
    }).get()
    if (event.mode == 0) {
      // console.log((new Date() - user.data.lastUpdate) / 1000 / 3600)
      if ((new Date() - user.data.lastUpdate) / 1000 / 3600 > 24)
        return {
          isRegist: false
        }
      return {
        isRegist: true,
        id: user.data._id,
        role: user.data.role,
        nickName: user.data.nickName,
        avatar: user.data.avatar
      }
    }
    if (user.data.nickName != event.nickName && user.data.avatar != event.avatar) {
      await db.collection('users').doc(wxContext.OPENID)
        .update({
          data: {
            nickName: event.nickName,
            avatar: event.avatar,
            lastUpdate: new Date()
          },
        })
    } else if (user.data.avatar != event.avatar) {
      await db.collection('users').doc(wxContext.OPENID)
        .update({
          data: {
            avatar: event.avatar,
            lastUpdate: new Date()
          },
        })
    } else if (user.data.nickName != event.nickName) {
      await db.collection('users').doc(wxContext.OPENID)
        .update({
          data: {
            nickName: event.nickName,
            lastUpdate: new Date()
          },
        })
    } else {
      await db.collection('users').doc(wxContext.OPENID)
        .update({
          data: {
            lastUpdate: new Date()
          },
        })
    }
    return {
      isRegist: true,
      id: user.data._id,
      role: user.data.role
    }
  } catch (e) {
    console.log(e)
    if (event.mode == 0) {
      return {
        isRegist: false
      }
    }
    let r = await db.collection('users').add({
      data: {
        _id: wxContext.OPENID,
        registDate: new Date(),
        lastUpdate: new Date(),
        role: 0,
        nickName: event.nickName,
        avatar: event.avatar,
        draft: {},
      }
    })
    return {
      isRegist: false,
      id: r._id
    }
  }

  // console.log(getNowFormatDate())


}