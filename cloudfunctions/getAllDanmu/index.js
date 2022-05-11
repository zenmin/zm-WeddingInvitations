const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV || 'dev-3gy6ld6nb339550f'
})

const db = cloud.database()
exports.main = async (event, context) => {
  // collection 上的 get 方法会返回一个 Promise，因此云函数会在数据库异步取完数据后返回结果 .where({ status: [0, 1] })
  return db.collection('danmu').orderBy('createTime', 'desc').get()
}
