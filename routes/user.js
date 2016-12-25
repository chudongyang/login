var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var fs = require('fs');
var router = express.Router();
router.use(bodyParser.urlencoded({extended:true}));
router.use(session({
    resave:true,
    saveUninitialized:true,
    secret:'zf'
}));
//登录
router.get('/login',function (req,res){
    res.render('login',{title:'欢迎登录',error:req.session.error,success:req.session.success});
});
router.post('/login',function (req,res){
    var obj = req.body;
    fs.readFile('./users.json','utf8',function (err,data){
        data = JSON.parse(data);
        var user = data.find(function (item){
            return item.username == obj.username && item.password == obj.password;
        });
        if(user){
            req.session.userName = req.body.username;
            req.session.success = '登陆成功';
            res.redirect('/user/index');
        }else{
            req.session.userName = '';
            req.session.success = '';
            res.redirect('/user/login');
        }
    });
});
//注册
router.get('/register',function (req,res){
    res.render('register',{title:'欢迎注册',error:req.session.error});
});
router.post('/register',function (req,res){
    var obj = req.body;
    fs.readFile('./users.json','utf8',function (err,data){
        data = JSON.parse(data);
        var user = data.find(function (item){
            return item.username == obj.username && item.password == obj.password;
        });
        if(user){
            req.session.error = '用户名已存在或密码输入错误';
            res.redirect('/user/register');
        }else{
            req.session.error ='';
            data.push(obj);
            fs.writeFile('./users.json',JSON.stringify(data),function(){
                res.redirect('/user/login');
            });
        }
    });
});

//回到主页
router.get('/index',function (req,res){
    res.render('index',{title:'欢迎回家',userName:req.session.userName,success: req.session.success})
});

module.exports = router;