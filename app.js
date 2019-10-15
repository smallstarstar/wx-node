var express = require('express');

var app = express();

const passport = require('passport');

// 配置允许跨域请求；
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Origin", "*"); //配置客户端 localhost与127.0.0.1是一个意思
    if (req.method == 'OPTIONS') {
        /*让options请求快速返回*/
        res.sendStatus(200);
    } else {
        /*防止异步造成多次响应，出现错误*/
        var _send = res.send;
        var sent = false;
        res.send = function (data) {
            if (sent) return;
            _send.bind(res)(data);
            sent = true;
        };
        next();
    }
});

// 一定要放在路由之前，否则报错 undifinded
var bodyParser = require('body-parser');

/**
 *  限制上传的数据大小
 */
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}))


// 初始化passport
app.use(passport.initialize());

require('./config/passport')(passport)


//路由处理 根据不同的功能划分模块
app.use('/api/v1', require('./controller/login'));
app.use('/api/v1', require('./controller/food'));


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:10003/wx-food', (erorr) => {
    if (erorr) {
        console.log('no')
    } else {
        console.log('数据库连接成功');
        app.listen(8666, () => {
            console.log('访问成功')
        });
    }
});