// 引入
const Koa = require('koa');

// 创建服务器
const app = new Koa();
// 监听端口
app.listen(9000);

// 配置路由
const Router = require('koa-router');

// 创建路由实例对象
let router = new Router();

// 配置路由规则
router.get('/login',(ctx)=>{
  // 登录后保存信息到session中
  ctx.session.user = {username:'jack',account:1000};
  ctx.body = '登录成功.余额为:' + ctx.session.user.account;
})
// 获取用户的token,并输出
.get('/strans',(ctx)=>{
  // 赚钱到银行
  ctx.session.user.account -= 100;
  ctx.body = '消费成功.余额为:' + ctx.session.user.account;
})

app.use(require('koa-static')('./'));


// 配置session
const session = require('koa-session');
app.keys = ['shhhhh'];
 
app.use(session(app));



// 配置路由中间件
app.use(router.routes() );
// 完善405方法不支持,和501 方法未实现,去替换统一404响应
app.use(router.allowedMethods() );