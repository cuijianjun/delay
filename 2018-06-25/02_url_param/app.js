const Koa = require('koa');
let app = new Koa();

// 路由
const Router = require('koa-router');
let router = new Router();
// 引入解析body的对象
const bodyParser = require('koa-bodyparser');

// 配置路由
router.get('/url_params',(ctx,next)=>{

  console.log(ctx.query);   // url地址栏 : /url_params?xxx=xxx
  // console.log(ctx.params);
})
  .get('/url_query/:id',ctx => {
    console.log(ctx.params);  // url:地址栏 : /url_query/123
  })

// 解析请求体,并挂在request.body属性的中间件必须在使用其之前声明
app.use(bodyParser());

app.use( router.routes() );
// 包装405和501的响应
app.use( router.allowedMethods() );

// 开启服务器
app.listen(8888);