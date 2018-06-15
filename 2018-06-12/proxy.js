const http = require('http');
let server = http.createServer();

const request = require('request');

const url = require('url');
server.on('request',(req,res) => {
  if(req.url.startsWith('./proxy')){
    //请求别人的数据返回
    var x = request('http://api.douban.com/v2/movie/in_theaters');
    req.pipe(x);
    x.pipe(res)
  }else if(req.url === '/'){
    let data = fs.readFileSync('./proxy.html');
    res.end(data)
  }
})

server.listen(8889,()=>{
  console.log('服务器启动8889端口');
})