/**
 * 配置字典表数据
 */

const express = require('express');

const router = express.Router();

const passport = require('passport');

const titleInfo = require('../models/add_titleInfo');


router.post('/titleInfos',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
    const titleName = req.body.titleName;
    titleInfo.findOne({titleName}).then((val)=>{
        if(val) {
            const messageInfo = {
                error:'名称已经存在',
            }
            return res.status(400).json(messageInfo);
        } else {
            // 保存数据
            const titleMessage = new titleInfo();
            titleMessage.titleName = req.body.titleName;
            titleMessage.index = +req.body.index;
            titleMessage.IsUse = req.body.IsUse;
            titleMessage.people = req.body.people;
            titleMessage.peopleId = req.body.peopleId;
            titleMessage.createdTime = req.body.createdTime;
            titleMessage.save();
            return res.status(200).send(true);
        }
    })
});

router.get('/getTitle',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
    titleInfo.find().then((val)=>{
        return res.status(200).json(val);
    })
});


router.delete('/delteById',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
    const _id = req.query.id;
    titleInfo.findByIdAndDelete({_id}).then((val)=>{
        if(val) {
            titleInfo.find().then((val)=>{
                val.forEach((ele,index)=>{
                    ele.index = index + 1;
                    console.log(ele.index);
                });
            })
            return res.status(200).send(true);
        } else {
            return res.status(400).send(false);
        }
    })
});


module.exports = router;