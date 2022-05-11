// components/welcome/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShow: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    bgurl: 'http://qny.01231230.cn/202112180015-095-zip6.jpg',  //'cloud://dev-3gy6ld6nb339550f.6465-dev-3gy6ld6nb339550f-1310723380/202112180015-095.jpg',
    bgurl_2: 'http://qny.01231230.cn/20222.jpg',
    bgurl_3: 	'http://qny.01231230.cn/3.jpg',
    latitude: 31.46841,
    longitude: 104.680095,
    markers: [{
      id: 1,
      latitude: 31.46841,
      longitude: 104.680095,
      name: '云孚里酒店'
    }],
    indicatorDots: true,
    vertical: false,
    previousMargin: 0,
    nextMargin: 0,
    circular: true
  },

  created: function() {
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getTimeAndAddress',
      // 传给云函数的参数
      data: {
      },
    })
    .then(res => {
      const { hotel, latitude, longitude } = res.result;
      this.setData({ ...res.result, markers: [{id: 1, latitude, longitude, name: hotel }] })
    })
    .catch(console.error)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toNavigation: function() {
      const { remark, address, latitude, longitude } = this.data
      wx.getLocation({
        type: 'wgs84', 
        success: function (res) {
          wx.openLocation({//​使用微信内置地图查看位置。
            latitude,//要去的纬度-地址
            longitude,//要去的经度-地址
            name: address,
            address: remark
          })
        }
      })
    },
  },

})
