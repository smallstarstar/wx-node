/**
 * 食物类的接口
 */
var express = require('express');

var router = express.Router();

// 将表引进来
var addFood = require('../models/add_food')
var time_sheet = require('../models/time_sheet');

router.post('/addFood', (req, res, next) => {
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
            food.save();
            // 添加流水信息
            let doSome = '添加了' + req.body.foodName;
            timeSheetData.addTimeSheet(req.body.createdPeo, req.body.createdId, req.body.foodTime, doSome);
            return res.send(true);
        }
    })
});


/**
 * 时间轴信息
 */
timeSheetData = {
    addTimeSheet(people, peopleId, time, doSome){
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
    const result = time_sheet.find();
    res.send(result);
})




module.exports = router;