// 1: 引入核心对象
const http = require('http');
// 读取文件
const fs = require('fs');

// 引入处理url的核心对象
const url = require('url');

// 2: 创建服务器
let app = http.createServer((req,res)=>{
  // 3: 处理请求
  //  127.0.0.1 || 127.0.0.1/index.html
  if (req.url === '/' || req.url === '/index.html') {
    fs.readFile('./search.html',(err,data)=>{
      //data是二进制数据,以16进制表现
      res.end(data);
    });
  } else if (req.url === '/views.html') {
    // /view
    fs.readFile('./views.html',(err,data)=>{
      if(err) throw err;
      res.end(data);
    });
  } else if (req.url.startsWith('/search')) {
    //  1:获取/search?name=xxx 中的 xxx
    let searchName = url.parse(req.url,true).query.name;
    //  2:url.parse('/search?name=xxx',true).query.name
    //  3: res.end('您查询的是:' + query.name);

    // 同步读取文件,并替换内容,渲染到页面
    // let readText = fs.readFileSync('./views.html').toString();
    let readText = fs.readFileSync('./views.html','utf8');
    readText = readText.replace('{{replaceText}}',searchName);

    // 响应数据
    // 为了更好的与浏览器交互,避免乱码情况
    // 告知响应体是什么编码
    res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
    // 按这个content-type的说法,响应数据
    res.end(readText);
  }
});

// 4: 监听端口
app.listen(8888);