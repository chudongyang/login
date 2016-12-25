var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var user = require('./routes/user');
//设置模板引擎
app.set('view engine','ejs');
//设置模板存放的路径
app.set('views',path.resolve('views'));
//参数指定的是静态文件存放目录的绝对路径
//console.log(path.resolve('public'));
app.use(express.static(path.resolve('public')));
//如果为true表示 使用querystring
app.use(bodyParser.urlencoded({extended:true}));

app.use('/user',user);

app.listen(8080);