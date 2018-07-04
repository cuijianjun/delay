const user_db = require('../models/db.js');
// 其实当require一个模块的时候,默认导出是一个空对象

// module.exports.checkUsername = function () {}
exports.checkUsername = async (ctx) => {
  // 1: 接收请求体数据  ctx.request.body
  let { username } = ctx.request.body;
  // 2: 查询数据库 let data = await user_db.q();
  let users = await user_db.q('select * from users where username = ?',[username]);
  // 3: 响应json对象
  //     ctx.body = {data};
  // users.length != 0 说明,有该用户,响应002 用户存在
  if (users.length !== 0) {
    return ctx.body = { code:'002',msg:'用户名已经存在' };
  }
  // 没有该用户
  ctx.body = { code:'001',msg:'可以注册'};
}
/**
 * 注册
 * @param  {[type]} ctx [description]
 * @return {[type]}     [description]
 */
exports.doRegiser = async ctx => {
  // 1:接收请求体数据
  let { username,password,email } = ctx.request.body;
  // 2:查询
  let users = await user_db.q('select * from users where username = ? or email = ?',[username,email]);
  let user;
  // users.length == 1 对比到底是username相等,还是email相等
  if (users.length !== 0) {

    if (users.length > 1 ) return ctx.body = {code:'004',msg:'用户名和邮箱都存在'};

    user = users[0]; // 注册已经被我卡死,所以此处最多一条
    if ( user.username === username && user.email === email) return ctx.body = { code:'004',msg:'用户名和邮箱都存在'};
    if (user.username === username ) return ctx.body = {code:'002',msg:'用户名已经存在'};
    if (user.email === email) return ctx.body = {code:'003',msg:'邮箱已经存在'};
  }
  // 查询用户名与username相等 || 邮箱与email相等
  // users.length == 0完全不等 =>  可以注册
  // 3:插入数据
  let result = await user_db.q('insert into users (username,password,email) values (?,?,?)',[username,password,email]);
  console.log(result);
  // 4:响应结果
  ctx.body = { code:'001',msg:'注册成功'};
}