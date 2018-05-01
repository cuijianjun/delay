const mysql = require('mysql')

let db = mysql.createPool({host:'localhost',user:'root',password:'123456',database:'201851'})

db.query('SELECT * FROM user_table', (err,data) => {
  if(err){
    console.log(err);
  }else{
    console.log(data);
  }
})