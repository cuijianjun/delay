const http =  require('http')
let server = http.createServer(function(req, res){
  // request 请求 - 输入 请求信息--哪个地址、时间、ip\方法
  // response 响应 -- 输出
  if(req.url == '/aaa'){
    res.write('abc')
  }else if (req.url == '/bbb'){
    res.write('111')
  }
  res.end()
});
server.listen(3001)
console.log('监听');