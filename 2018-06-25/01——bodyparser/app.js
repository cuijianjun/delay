const Koa = require('koa');
let app = new Koa();

//路由
const Router = require('koa-router');
let router = new Router();
const bodyParser = require("koa-bodyparser");

//配置路由
router.get('/test_bodyparser',(ctx,next)=>{
  console.log(ctx.request.body);
})

app.use(bodyParser());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8888)