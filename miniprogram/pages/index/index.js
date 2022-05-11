//index.js
const app = getApp()
// 'video',
const tabs = ['welcome', 'pic',  'wish']

Page({
  data: {
    currentTab: 'welcome',
    list: [
      {
        "text": "我们结婚啦",
        "iconPath": '../../../images/xin1.png',
        "selectedIconPath": "../../../images/xin2.png"
      },
      {
        "text": "我们的照片",
        "iconPath": "../../../images/p1.png",
        "selectedIconPath": "../../../images/p2.png"
      },
      // {
      //   "text": "我们的视频",
      //   "iconPath": "../../../images/s1.png",
      //   "selectedIconPath": "../../../images/s2.png"
      // },
      {
        "text": "大家的祝福",
        "iconPath": "../../../images/w1.png",
        "selectedIconPath": "../../../images/w2.png"
      }
    ],
    musicIcon: {
      play: '../../images/play.png',
      pause: '../../images/pause.png'
    },
    musicIconAnim: '',
    musicPaused: false
  },

  tabChange(e) {
    const { detail: { index } } = e;
    this.setData({ currentTab: tabs[index] });
    // 获取音乐当前播放的状态
    const musicPaused = this.audioMusic.paused;
    // 切换到视频的时候暂停
    if (index === 2) {
      !musicPaused && this.audioMusic.pause();
    } else {
      musicPaused && !this.data.musicPaused && this.audioMusic.play();
    }
  },

  swtichPlay() {
    if (this.data.musicPaused) {
      this.setData({
        musicPaused: false
      })
      this.audioMusic.play();
    } else {
      this.setData({
        musicPaused: true
      })
      this.audioMusic.pause();
    }
  },

  onLoad: function () {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    // 播放音乐
    this.audioMusic = wx.createInnerAudioContext();
    this.audioMusic.src = 'http://qny.01231230.cn/ayd.mp3' //'cloud://dev-3gy6ld6nb339550f.6465-dev-3gy6ld6nb339550f-1310723380/ayd.mp3';
    this.audioMusic.loop = true;
    this.audioMusic.play()

    // 显示分享页面
    wx.showShareMenu({ menus: ['shareAppMessage'] })
  },

  onShow: function () {
    if (!this.data.musicPaused && this.audioMusic.paused) {
      this.audioMusic.play();
    }
  },
  onShareAppMessage: function () {
    return {
      title: '曾敏❤彭小珍邀请您参加婚礼',
      imageUrl: '../../images/请柬.jpg'
    }
  },
})
