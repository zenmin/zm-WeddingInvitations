// components/video/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    videoUrl: "",
    danmuList: 
    [
      {
        text: '欢迎大家观看我们的微电影',
        color: '#ffffff',
        time: 0
      }
    ]
    ,
    danmuText: '',
    currentVideoTime: 0
  },

  ready() {
    this.fetchAllDanmu().then(danmus => {
      let arr = this.data.danmuList
      danmus.map(m => {
        arr.push({
          text: m.text,
          color: '#ffffff',
          time: m.time
        })
      })
        this.setData({
          danmuList: arr
        })
        console.log(this.data.danmuList)
      });
    this.watchDanmuDb();  
  },
 
  lifetimes: {
    detached() {
      this.watcher.close();
    }
  },


  /**
   * 组件的方法列表
   */
  methods: {
    // 查询所有弹幕数据
    async fetchAllDanmu() {
      // 获取所有祝福信息
      const resp = await wx.cloud.callFunction({
        // 云函数名称
        name: 'getAllDanmu',
        // 传给云函数的参数
        data: {
        },
      });
      return resp?.result?.data || [];
    },
    toVideo() {
      wx.navigateTo({
        url: 'video',
      })
    },
    // 监听当前danmu数据库的变化
    watchDanmuDb() {
      const _self = this;
      const db = wx.cloud.database()
      _self.watcher = db.collection('danmu')
        .orderBy('createTime', 'desc')
        // 取按 orderBy 排序之后的前 20 个
        .limit(100)
        .watch({
          onChange: function (snapshot) {
           
            const { type, docChanges, docs } = snapshot;
            // const newDanmuList = docChanges.map(({ doc }) => doc)
            // 非初始化数据
            if(type !== 'init') {
              /* _self.setData({
                danmuList: newDanmuList.concat(_self.data.danmuList)
              }); */
              let arr = []
              docs.map(m => {
                arr.push({
                  text: m.text,
                  color: '#ffffff',
                  time: m.time
                })
              })
              _self.setData({
                danmuList: arr
              })
            }
          },
          onError: function (err) {
            console.error('the watch closed because of error', err)
          }
        })
    },
    // 播放进度更新触发
    bindtimeupdate(event) {
      const { timeStamp } = event;
      this.setData({
        currentVideoTime: Math.round(timeStamp / 1000)
      })
      console.log(this.data.currentVideoTime)
    },
    bindInput(e) {
      const value = e.detail.value
      this.data.danmuText = value;
    },
    bindSendDanmu() {
      const { danmuText, currentVideoTime } = this.data;
      if(!danmuText) {
        wx.showToast({
          title: '请输入弹幕',
          icon: 'none',
        })
        return;
      }
      wx.showLoading({
        title: '发送中...',
      })
      wx.cloud.callFunction({
        // 云函数名称
        name: 'addDanmu',
        // 传给云函数的参数
        data: {
          danmu: {
            text: danmuText,
            time: currentVideoTime + 1,
            color: '#ffffff'
          }
        },
      }).then(() => {
        wx.showToast({
          title: '发送成功！',
          icon: 'none'
        })
        this.setData({
          danmuText: ''
        })
      }).catch(() => {
        wx.showToast({
          title: '发送失败',
        })
      }).finally(() => {
        wx.hideLoading();
      });
    },
  
  },
  
})
