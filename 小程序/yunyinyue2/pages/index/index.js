import request from "../../utils/request"
// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList:[],//轮播图
    recommendList:[],//推荐歌单
    topList:[],//排行榜数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  /* 
  async/await 是一种编写异步代码的新方法。之前异步代码的方案是回调和 promise。
  async/await 是建立在 promise 的基础上。
  和ajax一样都是浏览器自带的功能 不需要额外引入
  */
  onLoad:async function(options) {
    //向服务器获取轮播图的数据
    let result = await request("/banner",{type:2})
    this.setData({
      bannerList:result.banners
    })
    //向服务器获取推荐歌单的数据
    let recommendListData = await request("/personalized",{limit:10})
    this.setData({
      recommendList:recommendListData.result
    })
    //向服务器获取排行榜的数据
    /* 
      因为要获取idx 0-4的数据 所以要发送五次请求
    */
    let index=0
    let resultArr=[]
    while (index < 5) {
      let topListData = await request("/top/list",{idx:index++})
      let topListItem = {name:topListData.playlist.name, tracks:topListData.playlist.tracks.slice(0,3)}
      resultArr.push(topListItem)
    //这里不需要等待五次请求全部结束才更新，用户体验好，但是渲染次数多 废性能
      this.setData({
        topList:resultArr
      })
    }
    //更新 放在此处更新会导致发生请求过程中 页面长时间白屏 用户体验差
    this.setData({
      topList:resultArr
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})