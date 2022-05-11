// 云函数入口函数
exports.main = async (event, context) => {
  return {
    time: '2022年05月05日11时46分',
    chineseTime: '五月五日',
    hotel: '云浮里酒店',
    address: '云浮里酒店(绵阳市政府店)',
    latitude: 31.46841,//要去的纬度-地址
    longitude: 104.680095,//要去的经度-地址
    remark: '曾敏&彭小珍诚邀您前往参加婚礼'
  }
}