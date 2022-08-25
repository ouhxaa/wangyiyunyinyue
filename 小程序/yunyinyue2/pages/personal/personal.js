// pages/personal/personal.js
import request from "../../utils/request"
let startY = 0 //起始Y位置
let moveY = 0 //移动Y位置
let moveDistance = 0 //移动Y距离
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverTransform:"translateY(0)",
    coverTransition:"",
    userInfo:{},//用户信息
    recentPlayList:[]//用户播放记录
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  //读取用户的基本信息
  let userInfo = wx.getStorageSync("userInfo")
  if (userInfo) {
    this.setData({
      userInfo:JSON.parse(userInfo)
    })
  }
//由于接口更改 在这里违规传入固定数据来代替!!!!!!!!!!!!!!!!!!!!!!!!
  let test = {"data":{"code":200,"account":{"id":1682512904,"userName":"1_********389","type":1,"status":0,"whitelistAuthority":0,"createTime":1543123974512,"tokenVersion":2,"ban":0,"baoyueVersion":0,"donateVersion":0,"vipType":0,"anonimousUser":false,"paidFee":false},"profile":{"userId":1682512904,"userType":0,"nickname":"OU幻想","avatarImgId":109951167711658450,"avatarUrl":"http://p1.music.126.net/dsBJh4-H5tBfgNLly2pqiA==/109951167711658444.jpg","backgroundImgId":109951162868128400,"backgroundUrl":"http://p1.music.126.net/2zSNIqTcpHL2jIvU6hG0EA==/109951162868128395.jpg","signature":null,"createTime":1543381479261,"userName":"1_********389","accountType":1,"shortUserName":"********389","birthday":-2209017600000,"authority":0,"gender":0,"accountStatus":0,"province":440000,"city":440100,"authStatus":0,"description":null,"detailDescription":null,"defaultAvatar":false,"expertTags":null,"experts":null,"djStatus":0,"locationStatus":10,"vipType":0,"followed":false,"mutual":false,"authenticated":false,"lastLoginTime":1658588934506,"lastLoginIP":"116.21.235.207","remarkName":null,"viptypeVersion":0,"authenticationTypes":0,"avatarDetail":null,"anchor":false}}}
//由于接口更改 在这里违规传入固定数据来代替!!!!!!!!!!!!!!!!!!!!!!!!
//-------------------------------------------
let test2 ={"loginType":1,"code":200,"account":{"id":583206946,"userName":"1_15217192816","type":1,"status":0,"whitelistAuthority":0,"createTime":1504600203326,"salt":"","tokenVersion":0,"ban":0,"baoyueVersion":0,"donateVersion":0,"vipType":0,"viptypeVersion":0,"anonimousUser":false,"uninitialized":false},"token":"eacd0b64ae33f19b463a9a62ce11b108e1a09a428e19c1d4d8e0550fd3e3a126993166e004087dd3dd71807171b05a01cbf9039cbb4f8be63f364b94a68b9a35685d875d368e9cd2a89fe7c55eac81f3","profile":{"followed":false,"backgroundUrl":"https://p4.music.126.net/2zSNIqTcpHL2jIvU6hG0EA==/109951162868128395.jpg","detailDescription":"","userId":583206946,"userType":0,"avatarImgIdStr":"18975371672478834","backgroundImgIdStr":"109951162868128395","accountStatus":0,"vipType":0,"gender":2,"avatarImgId":18975371672478830,"nickname":"用户583206946","backgroundImgId":109951162868128400,"birthday":-2209017600000,"avatarUrl":"https://p4.music.126.net/wybMMt-glmcobTsXu7tbNQ==/18975371672478834.jpg","city":440100,"defaultAvatar":false,"province":440000,"expertTags":null,"experts":{},"mutual":false,"remarkName":null,"authStatus":0,"djStatus":0,"description":"","signature":"","authority":0,"avatarImgId_str":"18975371672478834","followeds":0,"follows":3,"eventCount":0,"avatarDetail":null,"playlistCount":27,"playlistBeSubscribedCount":0},"bindings":[{"userId":583206946,"url":"","expired":false,"bindingTime":1504600223296,"tokenJsonStr":"{\"countrycode\":\"\",\"cellphone\":\"15217192816\",\"hasPassword\":true}","expiresIn":2147483647,"refreshTime":1504600223,"id":3207993281,"type":1},{"userId":583206946,"url":"","expired":true,"bindingTime":1504600203466,"tokenJsonStr":"{\"access_token\":\"38_NAzJ5G6qu4Z3YeAgSXPD_NnEDg-b9iIcUlvQ9Rh0getMzsenWt9a0r3efFslqqH9N8c9fcysVappimBam9rW9ybgayKESm21jcWUkY8cK5c\",\"expires_in\":7200,\"refresh_token\":\"38_IPY8V0qluOmr7CtR-1gIUlczwQzLt_hjXCYC0pO1TnLDpQU9rDuacaTc_F79cTK3DVa5oh0L5AABuYFZ2zsLMhmEWtetswaQCsUgAP5Togk\",\"openid\":\"o5xcyt4OgM4I1DW28QkO5_T5JwV8\",\"scope\":\"snsapi_login\",\"unionid\":\"oZoefuNH8YT_tzOwNe51SDsyeNxY\",\"nickname\":\"天鹅\",\"birthday\":-2209017600000,\"country\":\"CN\",\"gender\":2,\"avatarUrl\":\"https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eq0hicMmbWmjRyH97HLEcUOM4o0TZjhxtrTnUKwicKfW992jiaOB2QLXKXUNL4ZODRNuHRoMrSVMZEwA/132\",\"city\":100,\"signature\":null,\"mobile\":null,\"screenName\":null,\"uid\":\"oZoefuNH8YT_tzOwNe51SDsyeNxY\",\"province\":0,\"followersCount\":0,\"followingsCount\":0}","expiresIn":7200,"refreshTime":1603786491,"id":3207993282,"type":10}],"cookie":"MUSIC_A_T=1504600203326; Max-Age=2147483647; Expires=Fri, 11 Aug 2090 19:19:41 GMT; Path=/wapi/clientlog;;MUSIC_R_T=1504600227224; Max-Age=2147483647; Expires=Fri, 11 Aug 2090 19:19:41 GMT; Path=/eapi/clientlog;;__remember_me=true; Max-Age=1296000; Expires=Mon, 08 Aug 2022 16:05:34 GMT; Path=/;;MUSIC_SNS=; Max-Age=0; Expires=Sun, 24 Jul 2022 16:05:34 GMT; Path=/;MUSIC_A_T=1504600203326; Max-Age=2147483647; Expires=Fri, 11 Aug 2090 19:19:41 GMT; Path=/eapi/feedback;;MUSIC_A_T=1504600203326; Max-Age=2147483647; Expires=Fri, 11 Aug 2090 19:19:41 GMT; Path=/weapi/clientlog;;MUSIC_R_T=1504600227224; Max-Age=2147483647; Expires=Fri, 11 Aug 2090 19:19:41 GMT; Path=/weapi/feedback;;MUSIC_A_T=1504600203326; Max-Age=2147483647; Expires=Fri, 11 Aug 2090 19:19:41 GMT; Path=/neapi/feedback;;MUSIC_A_T=1504600203326; Max-Age=2147483647; Expires=Fri, 11 Aug 2090 19:19:41 GMT; Path=/api/clientlog;;MUSIC_R_T=1504600227224; Max-Age=2147483647; Expires=Fri, 11 Aug 2090 19:19:41 GMT; Path=/api/clientlog;;__csrf=20a576516c49f6c34adcfd947717de25; Max-Age=1296010; Expires=Mon, 08 Aug 2022 16:05:44 GMT; Path=/;;MUSIC_A_T=1504600203326; Max-Age=2147483647; Expires=Fri, 11 Aug 2090 19:19:41 GMT; Path=/api/feedback;;MUSIC_A_T=1504600203326; Max-Age=2147483647; Expires=Fri, 11 Aug 2090 19:19:41 GMT; Path=/neapi/clientlog;;MUSIC_A_T=1504600203326; Max-Age=2147483647; Expires=Fri, 11 Aug 2090 19:19:41 GMT; Path=/eapi/clientlog;;MUSIC_R_T=1504600227224; Max-Age=2147483647; Expires=Fri, 11 Aug 2090 19:19:41 GMT; Path=/weapi/clientlog;;MUSIC_R_T=1504600227224; Max-Age=2147483647; Expires=Fri, 11 Aug 2090 19:19:41 GMT; Path=/wapi/feedback;;MUSIC_U=eacd0b64ae33f19b463a9a62ce11b108e1a09a428e19c1d4d8e0550fd3e3a126993166e004087dd3dd71807171b05a01cbf9039cbb4f8be63f364b94a68b9a35685d875d368e9cd2a89fe7c55eac81f3; Max-Age=1296000; Expires=Mon, 08 Aug 2022 16:05:34 GMT; Path=/;;MUSIC_A_T=1504600203326; Max-Age=2147483647; Expires=Fri, 11 Aug 2090 19:19:41 GMT; Path=/wapi/feedback;;MUSIC_R_T=1504600227224; Max-Age=2147483647; Expires=Fri, 11 Aug 2090 19:19:41 GMT; Path=/eapi/feedback;;MUSIC_R_T=1504600227224; Max-Age=2147483647; Expires=Fri, 11 Aug 2090 19:19:41 GMT; Path=/neapi/clientlog;;MUSIC_R_T=1504600227224; Max-Age=2147483647; Expires=Fri, 11 Aug 2090 19:19:41 GMT; Path=/wapi/clientlog;;MUSIC_A_T=1504600203326; Max-Age=2147483647; Expires=Fri, 11 Aug 2090 19:19:41 GMT; Path=/weapi/feedback;;MUSIC_R_T=1504600227224; Max-Age=2147483647; Expires=Fri, 11 Aug 2090 19:19:41 GMT; Path=/api/feedback;;MUSIC_A_T=1504600203326; Max-Age=2147483647; Expires=Fri, 11 Aug 2090 19:19:41 GMT; Path=/openapi/clientlog;;MUSIC_R_T=1504600227224; Max-Age=2147483647; Expires=Fri, 11 Aug 2090 19:19:41 GMT; Path=/neapi/feedback;;MUSIC_R_T=1504600227224; Max-Age=2147483647; Expires=Fri, 11 Aug 2090 19:19:41 GMT; Path=/openapi/clientlog;"}
//console.log(test2);
this.setData({
  userInfo:test2.profile
  //  userInfo:test.data.profile 获取登录信息接口就用这个 不然用上面那个
})
//设置用户的cookies 返回值没有找到这个 只有cookie
wx.setStorage({
  key:'cookie',
  data:test2.cookie
})
wx.a = test2.cookie
//获取用户播放记录
this.getUserRecentPlayList(this.data.userInfo.userId)
  },
  //获取用户播放记录用到的方法
 async getUserRecentPlayList(userid){
    let recenPlayListData = await request("/user/record",{uid:userid,type:0})
    let index = 0
    let recentPlayList = recenPlayListData.allData.splice(0,10).map(item =>{
      item.id = index++;
      return item
    })
    this.setData({
      recentPlayList:recentPlayList
    })
  },
//---------------------
  handleTouchStart(e){
    startY = e.touches[0].clientY
    this.setData({
      coverTransition:``,
    })
  },
  handleTouchMove(e){
    moveY = e.touches[0].clientY
    moveDistance = moveY-startY
    // 动态更新 coverTransform
    if (moveDistance <= 0) {
      return
    }
    if (moveDistance >= 80) {
      this.setData({
        coverTransform:`translateY(${moveDistance}rpx)`
      })
    }

  },
  handleTouchEnd(e){
    this.setData({
      coverTransition:`transform 1s linear`,
      coverTransform:`translateY(0)`
    })
  },
  // 跳转至登录Login页面的回调
  toLogin(){
    wx.navigateTo({
      url: '/pages/login/login',
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