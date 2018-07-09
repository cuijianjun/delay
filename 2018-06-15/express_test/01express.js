const express = require('express');

const app = express();

app.use((req,res) => {
  res.end("hello")
})

app.listen(8888,() => {
  console.log('服务器启动');
})
