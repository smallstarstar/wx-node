var express = require('express');

var router = express.Router();

var jwt = require('jsonwebtoken');

var KeyName = require('../config/keys');


const passport = require('passport')
// 引用表结构

var USERINFO = require('../models/user_info');

var messageCode = {
    messageLoginSuccess: 0, // 用户成功登陆,
    messageError: 1, // 用户信息错误
    messageNotFound: 2, // 用户不存在,
    messageAlreadyExist: 3, // 用户已经存在
    messageRegisterSuccess: 4 // 用户注册成功

}


// 用户登陆
router.post('/userInfo', (req, res, next) => {
    USERINFO.findOne({
        userName: req.body.userName,
        userPassword: req.body.userPassword
    }).then((result) => {
        if (result) {
            const messageInfo = {
                code: messageCode.messageLoginSuccess,
                message: '用户登陆成功',
                data: result,
            }
            // sign(规则，加密的名字，过期时间，箭头函数)
            const rule = {
                id: result._id,
            };
            jwt.sign(rule, KeyName.selectKey, {
                expiresIn: 3600
            }, (err, token) => {
                if (err) throw err;
                res.status(200).json({
                    success: true,
                    token,
                    messageInfo
                })
            })
        } else {
            const messageInfo = {
                code: messageCode.messageNotFound,
                message: '用户不存在，请注册'
            }
            res.status(404).send(messageInfo);
        }
    })
});

// 用户注册
router.post('/register', (req, res, next) => {
    USERINFO.findOne({
        userName: req.body.userName,
        userPhone: req.body.userPhone
    }).then((result) => {
        if (result) {
            const messageInfo = {
                code: messageCode.messageAlreadyExist,
                message: '用户已经存在'
            }
            return res.send(messageInfo);
        } else {
            // 用户注册
            const userInfoMessage = new USERINFO();
            userInfoMessage.userName = req.body.userName;
            userInfoMessage.userPhone = req.body.userPhone;
            userInfoMessage.userPassword = req.body.userPassword;
            userInfoMessage.userTime = req.body.userTime;
            userInfoMessage.userAddress = req.body.userAddress;
            userInfoMessage.userEmail = req.body.userEmail;
            userInfoMessage.userRole = req.body.userRole;
            userInfoMessage.save();
            const messageInfo = {
                code: messageCode.messageRegisterSuccess,
                message: '用户注册成功',
                data: userInfoMessageuserInfoMessage
            }
            return res.status(200).send(messageInfo);
        }
    })
})



module.exports = router;