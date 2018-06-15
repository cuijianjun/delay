
// 1: 编写基本服务器框架
const http = require('http');
let server = http.createServer();

// 引入request对象
const request = require('request');

// 引入fs读取html页面并返回
const fs = require('fs');


// 核心对象url来获取query
const url = require('url');
server.on('request',(req,res)=>{
  console.log("111");
  if (req.url.startsWith('/proxy')) {

    // 请求别人的数据返回给你
    // 再次去访问http://api.douban.com/v2/movie/in_theaters,
    // 将这个数据返回给客户端浏览器
    //

    // 创建一个客户端对象,指定url
    var x = request('http://api.douban.com/v2/movie/in_theaters');
    // 将原本请求的信息,通过管道传递到 x新请求对象中,并发起请求
    req.pipe(x); // x copy req的请求参数
    // 将x的响应数据,通过管道流到 页面的ajax响应中
    x.pipe(res); // x将响应传输给res

  } else if(req.url === '/') {
    // 返回页面
    let data = fs.readFileSync('./03_proxy.html');
    res.end(data);
  }
});
// 3: 端口是8888
server.listen(8889,()=>{
  console.log('服务器启动在8889端口');
})