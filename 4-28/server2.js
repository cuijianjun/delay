const http =  require('http')
const fs = require('fs')
let server = http.createServer((req, res)=>{
    fs.readFile(`aas${req.url}`, (err,data) => {
      if(err){
        res.writeHeader(404)
        res.write('NOT Found')
      }else{
        res.write(data)
      }
      // 写在最后
      res.end()
    })

});
server.listen(3001)
console.log('监听');