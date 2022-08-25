import request from "../..//utils/request"
/* 
  登录流程
  1.收集表单项数据
  2.前端验证
    (1)验证用户信息是否合法
    (2)前端验证不通过就提示用户，不需要发请求给后端
    (3)前端验证通过了，发请求(携带账号，密码)给服务器端
  3.后端验证
    (1)验证用户是否存在
    (2)用户不存在直接返回,告诉前端用户不存在
    (3)用户存在需要验证密码是否正确
    (4)密码不正确返回前端
    (5)密码正确返回给前端数据，提升用户登录成功(会携带用户相关信息)
*/
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:"",//手机号
    captcha:""//验证码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
//表单项内容发生改变的回调
handleInput(e){
  let type =e.currentTarget.id //这里和e.target.id一样 感觉这个东东这里用不合适 不如e.target.id呢
  this.setData({
    [type]:e.detail.value
  })
},
//登录的回调
async login(){
  let {phone,captcha} =this.data //这里是解构赋值
  if (!phone) {
    wx.showToast({
      title:'手机号不能为空',
      icon:"none",
    })
    return
  }
  //定义手机号验证的正则表达式
  let phoneReg = /^1(3|4|5|6|7|8|9|)\d{9}$/
  if (!phoneReg.test(phone)) {
    wx.showToast({
      title:'手机号格式错误',
      icon:"none",
    })
    return
  }
  //验证码是否为空
  if (!captcha) {
    wx.showToast({
      title:'验证码不能为空',
      icon:"none",
    })
    return
  }

  //后端验证-------------------
  let result =await request("/login/cellphone",{phone,captcha,isLogin:true})
  if (result.code === 200) {
    wx.showToast({
      title:'登录成功'
    })
    //将用户的数据存储至本地
    wx.setStorageSync('userInfo',JSON.stringify(result.profile))
    //跳转回个人中心
      wx.switchTab({
        url: '/pages/personal/personal',
      })
  }else if(result.code === 400){
    wx.showToast({
      title:'手机号错误',
      icon:"none",
    })
  }else if(result.code === 502){
    wx.showToast({
      title:'验证码错误',
      icon:"none",
    })
  }else{
    wx.showToast({
      title:'登录失败，请重新登录',
      icon:"none",
    })

    if (result.code === -462) {
      wx.showToast({
        title:'网络拥挤?'
      })
    }
  }
},
/* 获取验证码 */
login2(){
  let {phone,captcha} =this.data //这里是解构赋值
  if (!phone) {
    wx.showToast({
      title:'手机号不能为空',
      icon:"none",
    })
    return
  }
  //定义手机号验证的正则表达式
  let phoneReg = /^1(3|4|5|6|7|8|9|)\d{9}$/
  if (!phoneReg.test(phone)) {
    wx.showToast({
      title:'手机号格式错误',
      icon:"none",
    })
    return
  }
  let result = request("/captcha/sent",{phone})
},
/* 获取二维码 */
login3(){
  let {phone,captcha} =this.data //这里是解构赋值
  if (!phone) {
    wx.showToast({
      title:'手机号不能为空',
      icon:"none",
    })
    return
  }
  //定义手机号验证的正则表达式
  let phoneReg = /^1(3|4|5|6|7|8|9|)\d{9}$/
  if (!phoneReg.test(phone)) {
    wx.showToast({
      title:'手机号格式错误',
      icon:"none",
    })
    return
  }
  let result = request("/captcha/sent",{phone})
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