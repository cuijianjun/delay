const Router = require('koa-router')
let userController = require('../controllers/user_controller');
let router = new Router();
router.get("/register",ctx=>{
  ctx.render('register')
}).get('/login',ctx => {
  ctx.render('login')
})
// .post('/check-username',(ctx)=>{ /*各种操作包括db*/ })
  .post('/check-username', userController.checkUsername ) // 检查用户名
  .post('/do-register',userController.doRegiser )

//路由规则   ---- test
// router.get('/',async ctx =>{
//   let db=require('./models/db');
//   let users = await db.q('select * from users where id = ?',[5]);
//   let user = users[0]
//   console.log(users);
//   ctx.render('index',{
//     text:user.username
//   })
// })
module.exports = router;