// 云函数入口文件
const cloud = require('wx-server-sdk')
const moment = require('moment-timezone');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV || 'dev-3gy6ld6nb339550f'
})

// 云函数入口函数
const db = cloud.database()
exports.main = async (event, context) => {
  moment.locale('zh-cn');
  const { wish } = event;
  const time = moment().tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss');
  Object.assign(wish, { time, status: 0 });
  // collection 上的 get 方法会返回一个 Promise，因此云函数会在数据库异步取完数据后返回结果
  return db.collection('wish').add({ data: wish });
}