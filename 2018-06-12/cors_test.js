// Access-Control-Allow-Origin: 'http://xxx.com'  //允许哪个域在跨域的时候访问,*代表所有
// // 告诉浏览器,跨域时允许有cookie,同时客户端也要设置withCredentials:true + Origin不能是*
// Access-Control-Allow-Credentials: true
// Access-Control-Allow-Methods: 'GET,POST,PUT,DELETE';   // 默认允许get/post
// Access-Control-Request-Headers:'xxx';   // 允许你自己加的头来通信

const http = require('http');
const url = require('url');
 let server = http.createServer();

 server.on("request",(req,res)=>{
   if(req.url.startsWith('./cors')){
     //仅仅当前的地址能请求
     res.setHeader('Access-Control-Allow-Origin',"http://localhost:9000");
     //所有的服务器
     res.setHeader("access-control-allow-origin",'*')
     res.setHeader('Access-Control-Allow-Methods','GET,PUT,DELETE,OPTIONS');
     //运行自定义的头
     res.setHeader('Access-Control-Allow-Headers','my-token,content-type')
     res.end("ok");
   }
 })

server.listen(8888);