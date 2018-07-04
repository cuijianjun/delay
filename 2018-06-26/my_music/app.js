// 构建服务器架构,配置好art-template,路由
const Koa = require('koa')
const path = require('path')
let app = new Koa();

const render = require('koa-art-template');
// 处理请求体数据
var bodyParser = require('koa-bodyparser');

render(app,{
  // 配置目录,后缀名,是否是调试模式(我们的机器一般都是true)
  // 调试模式: 不压缩代码,实时更新html的静态内容(每次都读文件)
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production' // true 我的环境变量中,没有这个变量,或者不是production的值
})



const router = require("./routes/user_router")
//重写url,改掉/public
app.use(async (ctx,next) =>{
  //判断 如果当前的请求以/public开头的。重写其url在放行
  if(ctx.request.url.startsWith('/public')){
    ctx.request.url = ctx.request.url.replace('/public','')
    // /public/css/x.css  => /css/x.css
  }
  // else不是/public开头的，统一放行
  await next()
})
//处理静态资源
app.use(require('koa-static')('./public'));

// 处理请求体数据 开始
app.use(bodyParser());  // 给ctx.request.body 挂数据
// 处理请求体数据 结束

//将路由对象放入到中间件中
app.use(router.routes());
//状态码增强 404 => 405 + 501
//405 ：url 存在请求方式的错误
//501： copy之类de 不常见的请求方式，服务器没有实现对其处理的
app.use(router.allowedMethods())

//开启服务器
app.listen(8888,()=>{
  console.log("服务器启动8888");
})