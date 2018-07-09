

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

// socket.io 开始
const IO = require( 'koa-socket' );
const io = new IO();
 
// 让socket.io监管app
io.attach( app );
 
io.on('connection', sock => {
  console.log('客户端有人进来了');
});

//disconnect
io.on('disconnect', sock => {
  console.log('客户端退出了');
});

// 服务器接受客户端消息
io.on('toserver', ctx => {
  console.log(ctx.data);
  // 回写数据给客户端
  ctx.socket.emit('toclient','我知道你来了');
});

// 需求的实现
io.on('broadcast',ctx=> {
  // console.log(ctx.data);
  let { nickname,content } = ctx.data;
  // 接收到消息,直接广播出去
  io.broadcast('toAll',nickname + '说' + content );
})




// socket.io 结束



const path = require('path');
// 配置模板引擎
render(app, {
  root: path.join(__dirname, 'views'),  // 文件查找根目录
  extname: '.html',
  // debug false  代表开发环境 ,实时读文件更新静态的数据,不压缩...
  debug: process.env.NODE_ENV !== 'production'
});
 



// 创建并配置路由对象
let router = new Router();
router.get('/',ctx=>{
    //响应聊天室首页
    ctx.render('index',{
      msgs
    });
})
// 处理发送消息的请求
.post('/send-msg',ctx => {
  // 获取form提交中的请求体数据
  let { nickname,content } = ctx.request.body;
  // 加入到消息
  msgs.push( {
    nickname,content
  });
  // 响应新的页面
  ctx.render('index',{
      msgs
  }); 
})


// 处理静态资源
// app.use(require('koa-static')(root, opts));
app.use(static('./public'));
// 解析请求体数据
app.use(bodyParser() );
// 路由处理
app.use(router.routes() );
app.use(router.allowedMethods() );


app.listen(8888);
