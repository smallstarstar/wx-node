/**
 * 食物类的接口
 */
var express = require('express');

var router = express.Router();


const passport = require('passport')

// 将表引进来
const addFood = require('../models/add_food')
const time_sheet = require('../models/time_sheet');
const add_Evenation = require('../models/add_evenation');
const addKindInfo = require('../models/add_foodkind');

router.post('/addFood', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    addFood.findOne({
        foodName: req.body.foodName
    }).then((result) => {
        if (result) {
            return res.send('已经存在')
        } else {
            // 保存数据库
            const food = new addFood();
            food.foodName = req.body.foodName;
            food.foodKind = req.body.foodKind;
            food.foodPrice = req.body.foodPrice;
            food.foodPicture = req.body.foodPicture;
            food.foodDec = req.body.foodDec;
            food.createdPeo = req.body.createdPeo;
            food.createdId = req.body.createdId;
            food.foodTime = req.body.foodTime;
            food.foodCommand = req.body.foodCommand;
            food.save();
            // 添加流水信息
            let doSome = '添加了' + req.body.foodName;
            timeSheetData.addTimeSheet(req.body.createdPeo, req.body.createdId, req.body.foodTime, doSome);
            return res.send(true);
        }
    })
});

/**
 * 获取推荐资源数据
 */
router.get('/getFoodlist', (req, res, next) => {
    addFood.find().then((val) => {
        if (val) {
            return res.json(val);
        }
    })
});


/**
 * 根据商品的id查询商品的信息
 */
router.get('/getfooddetailById', (req, res, next) => {
    const id = req.query.id;
    addFood.findById({
        _id: id
    }).then((val) => {
        if (val) {
            return res.json(val);
        }
    })
})

/**
 * 保存用户评价信息
 */
router.post('/saveEvenation', (req, res, next) => {
    const ss = req.body.eventationInfo;
    const addEvenation = new add_Evenation();
    addEvenation.evenationPeo = ss.evenationPeo;
    addEvenation.evenationPeoId = ss.evenationPeoId;
    addEvenation.evenationFoodId = ss.evenationFoodId;
    addEvenation.evenaNum = ss.evenaNum;
    addEvenation.time = ss.time;
    addEvenation.contentText = ss.contentText;
    if (!addEvenation.evenationPeoId || !addEvenation.contentText) {
        const messageInfo = {
            state: false,
            message: '参数错误'
        }
        return res.status(400).json(messageInfo)
    } else {
        const messageInfo = {
            state: true,
            message: '保存成功'
        }
        addEvenation.save();
        return res.json(messageInfo);
    }
});

/**
 * 根据商品的id获取该商品的评价
 */
router.get('/getEventafoodById', (req, res, next) => {
    const id = req.query.id;
    add_Evenation.find({
        evenationFoodId: id
    }).then((val) => {
        return res.json(val);
    })
})


/**
 * 时间轴信息
 */
timeSheetData = {
    addTimeSheet(people, peopleId, time, doSome) {
        const timeSheet = new time_sheet();
        timeSheet.people = people;
        timeSheet.peopleId = peopleId;
        timeSheet.actions = doSome;
        timeSheet.time = time;
        return timeSheet.save();
    }
}


/**
 *  获取流水信息
 */
router.get('/addTimeSheets', (req, res, next) => {
    time_sheet.find().then((val) => {
        return res.json(val);
    });
})

/**
 * 保存种类信息
 */

router.post('/saveKindInfo', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    const findName = req.body.foodKindName;
    addKindInfo.findOne({
        foodKindName: findName
    }).then((val) => {
        if (val) {
            const messageInfo = {
                code: 1,
                message: findName + '已经存在'
            }
            return res.status(404).json(messageInfo);
        } else {
            // 保存数据
            const foodKindMessage = new addKindInfo();
            foodKindMessage.foodKindName = req.body.foodKindName;
            foodKindMessage.people = req.body.people;
            foodKindMessage.peopleid = req.body.peopleid;
            foodKindMessage.createdTime = req.body.createdTime;
            foodKindMessage.save();
            const messageInfo = {
                code: 0,
                state: true,
                data: foodKindMessage
            }
            return res.status(200).json(messageInfo);
        }
    })
});


/**
 *  分页获取种类信息
 * limit
 * skip = (page-1)*limit
 */

router.post('/getkindDataBypage', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    const page = +req.body.page;
    const size = +req.body.size;
    const limit = size;
    const skip = (page - 1) * limit;
    addKindInfo.count().then((total) => {
        addKindInfo.find().limit(limit).skip(skip).then((val) => {
            const message = {
                total: total,
                val: val
            }
            return res.status(200).json(message);
        })
    })
});

/**
 * 根据删除商品的种类
 * @param{ id }
 */
router.delete('/deleteFoodKind',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
    const id = req.query.id;
    addKindInfo.findByIdAndDelete({
        _id:id
    }).then((val)=>{
        if(val){
            res.status(200).send(true);
        } else {
            res.status(400).send(false);
        }
    })
})

module.exports = router;