/*const http = require('http');
// 2:通过核心对象创建服务器对象
let server = http.createServer((req,res)=>{
  // 当请求进来了 // 4:处理响应
  console.log('请求进来了');
});
// 3:监听端口,设置IP
server.listen(8888,'192.168.89.130',()=>{
    console.log('服务器启动在8888端口,IP::192.168.89.130');
});*/
const http = require('http');
// 2:通过核心对象创建服务器对象
let server = http.createServer();

// 2.5:绑定请求事件
server.on('request',(req,res) => {
  console.log('请求进来了2222');
});

// 3:监听端口,设置IP
server.listen(8888,'0.0.0.0',()=>{
  console.log('服务器启动在8888端口,IP::192.168.89.130');
});