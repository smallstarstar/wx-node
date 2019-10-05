var express = require('express');

var router = express.Router();

// 引用表结构

var userInfo = require('../models/user_info')

// 用户登陆
router.get('/userInfo/{userName}/{userPassword}',(req,res,next)=>{
    console.log(req);
    userInfo.findOne({

    }).then((result)=>{
        if(result) {
            console.log(result)
        } else {
            console.log('用户不存在')
        }
    })
})








module.exports = router;