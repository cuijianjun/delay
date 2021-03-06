const Koa = require('koa');
const static = require('koa-static');
const Router = require('koa-router');
const render = require('koa-art-template');
const bodyParser = require('koa-bodyparser');

let msgs = [
  { nickname:'小明',content:'今天内容有点难'   },
  { nickname:'小刚',content:'没事,难我能搞定,也可以跟老师交流'   },
  { nickname:'小红',content:'小刚,我喜欢你,够man'   }
];

let app = new Koa();
const IO = require("koa-socket");
const io = new IO();
const users = {};
//socket.io监管app
io.attach(app);

//链接时 记录rose
io.on("connection",socket =>{
  console.log("客户端进来了");
})
io.on('login',ctx =>{
  users[ctx.data.nickname] = ctx.socket.id;
})

//先接收towho
io.on('towho',ctx =>{
  let {to,content} = ctx.data;
  //to代表rose
  //取出users中的socketid并私聊
  console.log(users,to);
  if(users[to]){
    app._io.to(users[to]).emit('message','y有人对你私聊' + content);
  }else{
    //广播
    io.broadcast('message',content);
  }
})
//socket.io结束
const path = require('path');
//配置模板引擎
render(app,{
  root:path.join(__dirname,'views'),
  extname:'.html',
  debug: process.env.NODE_ENV !== 'production'
});

//创建并配置路由对象
let router = new Router();
router.get('/',ctx =>{
  //响应聊天室首页
  ctx.render('index')
})

//处理静态资源
app.use(static('./public'));
//解析请求体数据
app.use(bodyParser())
//路由处理
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8888);






