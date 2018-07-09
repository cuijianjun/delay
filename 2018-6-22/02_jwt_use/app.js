const jwt = require('koa-jwt');
const jsonwebtoken = require('jsonwebtoken');
// // 请求时验证token     // 不论如何都显示页面    // 排除 以/public开头的
// app.use(jwt({ secret: 'shhhhh',passthrough:true }).unless({path:[/^\/public/]}));


// 需求: 使用token的方式,来替代cookie,
// 从而进入页面A得到token
// 进入页面B,通过token让服务器显示数据


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
router.get('/gettoken',(ctx)=>{
    // 生成一个token并响应给客户端
    let token = jsonwebtoken.sign({userid:1},'shhhhh');

    // 通过响应头发送token
    ctx.response.set('my-token',token);
    ctx.body = 'cookie回写成功';
})
// 获取用户的token,并输出
.get('/showinfo',(ctx)=>{
  // 从请求头中获取token
  // console.log(ctx.request.headers['my-token']);
  
  // jwt中为了获取之前加密的数据,可以使用ctx.state.user来拿
  console.log(ctx.state.user); // {userid:1}
  // 如果以上对象没有值,显示一个登录页面给用户,体验更好,而不是默认的token错误页面

  console.log('请求进来了');
  ctx.body = '登录成功,你看到了首页';
})
  
// 将jquery.js 和test.html  向外暴露  
// 通过 localhost:8888/jquery.js就能访问
app.use(require('koa-static')('./'));
                    // 不管当前是否满足token的验证条件,都显示页面
app.use(jwt({ secret: 'shhhhh',passthrough:true })
// 排除
.unless({path:['/gettoken']}) );



// 配置路由中间件
app.use(router.routes() );
// 完善405方法不支持,和501 方法未实现,去替换统一404响应
app.use(router.allowedMethods() );