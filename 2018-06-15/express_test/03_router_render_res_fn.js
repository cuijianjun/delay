const express = require('express');

const app = express();

const expressArtTemplate = require('express-art-template');
app.engine('art',expressArtTemplate);

app.set('view options', {
    //  debug 表示是否压缩文件,是否使用缓存
    debug: process.env.NODE_ENV !== 'production'
});

const router = express.Router();
router.get('/',(req,res,next) => {
  res.json({name:'jack'})
})
.post('/post',(req,res)=>{
  res.download('./02express.js')
})
.get('/jsonp',(req,res) => {
  res.jsonp('我是jsonp')
})
.get('/render',(req,res)=>{
  res.render('index.art',{
    text:'hello'
  })
})

app.use(router)

app.listen(8888,() => {
  console.log('服务器启动');
})
