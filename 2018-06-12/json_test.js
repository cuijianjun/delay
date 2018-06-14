const http = require('http');
const url = require("url")
let server = http.createServer()

server.on('request',(req,res)=>{
  if(req.url.startsWith('/jsonp')){
    let callbackName = url.parse(req.url,true).query.callback;
    let findData = '机密数据';
    res.end(`${callbackName}('${findData}')`);
  }
})

server.listen(8888)
