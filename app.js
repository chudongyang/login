/**
 * 注册登录的实战
 * 1. get方法访问 /signup  ，返回一个空白注册表单,有用户名和密码两个字段
 * 2. 当以POST方式提交注册表单，服务器要保存此用户, 保存完毕后跳转到登录页
 * 3. get方式访问/signin的时候，返回一个空白登录表单，有用户名和密码两个字段
 * 4.再次以post方法提交登录表单，判断用户输入的用户和密码是否匹配。
 * 如果匹配的话跳到欢迎页，如果没匹配，退回上一个登录页继续填写。
 *
 */
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.set('views',path.resolve('views'));

app.use(express.static(__dirname));
var users = [];
//注册
app.get('/signup',function (req,res){
    res.render('signup',{title:'注册页面'});
});
app.post('/signup',function (req,res){
    var obj = req.body;
    users.push(obj);
    res.redirect('/signin');
});
//登录
app.get('/signin',function (req,res){
    res.render('signin',{title:'登录页面'});
});
app.post('/signin',function (req,res){
    var obj = req.body;
    var user = users.find(function (item){
        return item.userName == obj.userName && item.password == obj.password;
    });
    if(user){
        res.redirect('/welcome');
    }

});
//欢迎页
app.get('/welcome',function (req,res){
    res.render('welcome',{title:'欢迎页面'});
});
app.listen(8080);