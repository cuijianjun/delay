const path = require('path'); // requie就是引入一个模块
// path 是node中的核心对象,就得这么写

// 1: 给定一些琐碎的路径,最终拼接成正确的路径
//    例如:  当前目录 + files + jpg + 1.jpg

// path.join会修正路径
let strPath = path.join(__dirname,'///files','jpg','1.jpg');
console.log(strPath);

// 获取文件的名称,或者后缀名,.可以将其转换成对象
const pathObj = path.parse(strPath);

// 这些属性依据原字符串而生成的,不能改
pathObj.ext = '.txt';
pathObj.name = '2';

console.log(pathObj);

// 如果你改动了对象的属性,是否是为了生成新的字符串路径?

// 如果需要改动文件的后缀和文件名信息,使用base属性
pathObj.base = 'newFile.txt';

let strPathNew = path.format(pathObj);
console.log(strPathNew);


