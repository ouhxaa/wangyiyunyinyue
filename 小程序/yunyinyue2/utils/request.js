import config from "./config"
// 发送ajax请求
export default (url,data={},method="GET")=>{
    return new Promise((resolve,reject)=>{
        wx.request({
            // "url":url,
            // "data":data, 
            url:config.host+url,
            data,//e6语法可以这样写 跟上面一个意思
            method,
/* 
请求中没有自定义HTTP头部。

  对于简单跨域请求，浏览器要做的就是在HTTP请求中添加Origin Header，
    将JavaScript脚本所在域填充进去，向其他域的服务器请求资源。
  服务器端收到一个简单跨域请求后，根据资源权限配置，
    在响应头中添加Access-Control-Allow-Origin Header。
    浏览器收到响应后，查看Access-Control-Allow-Origin Header，
    如果当前域已经得到授权，则将结果返回给JavaScript。否则浏览器忽略此次响应。
 */
/*             header:{
              cookie:wx.getStorageSync('cookies')
            }, */
            success:(e)=>{
/*               if(data.isLogin == true){
                //接口好像变了 不用这个了
                wx.cookie = e.cookies

                //将用户的cookies存入本地
                wx.setStorage({
                  key:'cookies',
                  data:e.cookies
                })
              } */
                resolve(e.data)//成功状态和返回值
            },
            fail:(e)=>{
                reject(e)//失败状态和返回值
            },
        })
    })
}