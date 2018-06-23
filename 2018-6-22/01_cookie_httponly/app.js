// 引入
const Koa = require('koa');

// 创建服务器
const app = new Koa();
// 监听端口
app.listen(8888);


// 配置路由
const Router = require('koa-router');

// 创建路由实例对象
let router = new Router();

// 配置路由规则
router.get('/getcookie',(ctx)=>{
    // ctx.cookies.set(key,value);
    ctx.cookies.set('name','jack',{
      httpOnly:true,   
      // false的时候客户端可以通过document.cookie看到
    });
    ctx.body = 'cookie回写成功';
});

// 配置路由中间件
app.use(router.routes() );
// 完善405方法不支持,和501 方法未实现,去替换统一404响应
app.use(router.allowedMethods() );