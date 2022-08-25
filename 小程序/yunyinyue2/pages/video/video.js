import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList:[],//导航的标签数据
    navId:"",//导航的标识
    videoList:[],//视频的列表数据
  },
// 获取导航数据
 async getvideoGroupListData(){
  let videoGroupListData = await request('/video/group/list')
  this.setData({
    videoGroupList:videoGroupListData.data.slice(0,13 ),
    navId:videoGroupListData.data[0].id
  })
  //获取视频列表数据
  this.getVideoList(this.data.navId)
},

async getVideoList(navId){
  let videoListData = await request('/video/group',{id:navId})
  this.setData({
    videoList:videoListData.datas
  })
console.log(videoListData);
},
// 点击切换导航的回调
changeNav(e){
  let navId = e.currentTarget.id
  this.setData({
    navId:navId*1
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //获取导航数据
    this.getvideoGroupListData()
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