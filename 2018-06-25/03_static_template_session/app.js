// 1: 来个首页,通过静态资源(static)处理相应index.html
// 2: index.html 中有个登录按钮 url:  /login
// 3: 服务器 /login   直接在session中保存用户数据(响应cookie)
// 4: 渲染一个包含动态数据的show.html页面 (art-template)

const Koa = require('koa');
const static = require('koa-static');
const Router = require('koa-router');
const session = require('koa-session');
const render = require('koa-art-template');
let app = new Koa();
const path = require('path');
// 配置模板引擎
render(app, {
  root: path.join(__dirname, 'view'),  // 文件查找根目录
  extname: '.html',
  // debug false  代表开发环境 ,实时读文件更新静态的数据,不压缩...
  debug: process.env.NODE_ENV !== 'production'
});
 



// 创建并配置路由对象
let router = new Router();
router.post('/login',ctx=>{
    // 记住用户
    console.log('进来了');
    // 给用户保存数据到session并响应cookie
    ctx.session.user = { name:'jack'};
    ctx.body = '登录成功';
})
// 简单测试session值的获取
.get('/get-session',ctx=>{
  // ctx.body = ctx.session.user;
  let stus = [{name:'张三'},{name:'李四'},{name:'王五'}];
  let user = ctx.session.user;
  ctx.render('show',{
    stus,user,html:'<h1>我是h1</h1>'
  });
})


// 配置session  开始
app.keys = ['some secret hurr'];  // 必须要的一个算法依赖
 
const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};
 
// app.use(session(CONFIG, app));
// 如果一切遵循默认配置,也可以不传递config对象
app.use(session(app));
// 配置session  结束


// 处理静态资源
// app.use(require('koa-static')(root, opts));
app.use(static('./public'));



app.use(router.routes() );
app.use(router.allowedMethods() );


app.listen(8888);
