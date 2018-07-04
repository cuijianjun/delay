const musicDB = require('../models/db');
const path = require('path');
exports.showIndex = async ctx => {
  // 获取session数据 => 用户可能此时没有登录（中间件统一处理）
  let user = ctx.session.user;
  //查询数据库
  let musics = await  musicDB.q('select * from musics where uid = ?',[user.id]);
  //ctx.body = musics;
  //3.ctx.render渲染到页面
  ctx.render('index',{
    musics
  });
}

//添加音乐

exports.addMusics = async ctx => {
  //获取文字数据 和文件数据
  let {title,singer,time } = ctx.request.body;//文字
  //获取歌词和歌曲的路径（网络）
  let filePath = ctx.request.files.file.path;
  let fileLrcPath = ctx.request.files.filelrc.path;
  //使用核心对象path解析，并获取其base属性，name+ext
  let net_filePath = '/public/files/' + path.parse(filePath).base;
  let net_fileLrcPath = '/public/files' + path.parse(fileLrcPath).base;
  //从session中取出uid
  let uid = ctx.session.user.id
  //将数据保存进数据库
  let result = await musicDB.q('insert into music (title,singer,time,file,fileLrc,uid) values (?,?,?,?,?)',[title,singer,time,net_filePath,net_fileLrcPath,uid])
  console.log(result);
  ctx.body  = {
    code:'001',
    msg:'上传成功'
  }
}