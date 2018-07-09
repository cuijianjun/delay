const Koa = require('koa');

const app = new Koa();

//安排一个中间件
// app.use((context,next) =>{
//   console.log(context.request.url);
//   console.log(context.request.method);
//   console.log(context.request.headers);
//   context.response.set('my-token','abad');
//   context.response.status = 404;
//   context.response.body = {name:'koa'};
//   context.cookies.set('name','jack');
// })
//这个中间件目前还未执行
 app.use(async (ctx,next) => {
  ctx.response.body = await new Promise(function (resolve, reject) {
    require('fs').readFile('./01_start-req_res.js','utf8',(err,data)=>{
      if(err){
        reject(err);
        return;
      }
      resolve(data)
    })
  })
})

app.listen(8888,()=>{
  console.log('服务器启动了');
})