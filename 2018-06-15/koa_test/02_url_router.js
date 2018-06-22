//url重写： 原本有一个url：  但是不和首页的/一样，但是我们需要首页显示/XXX

//配置两条路由

const Koa = require('koa');

//创建服务器对象
const app = new Koa();

//引入路由中间件

const Router = require('koa-router');

//创建实例对象
var router = new Router();

router.get('/',(ctx,next) =>{
  ctx.body = 'hello'
})
.get('/test',(ctx,next)=>{
  ctx.body = 'world'
})

app.use(router.routes())
.use(router.allowedMethods());

app.listen(8888);