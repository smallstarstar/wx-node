var mon = require('mongoose');

module.exports = new mon.Schema({
    // 评价人员
    evenationPeo: String,
    // 人员id
    evenationPeoId: String,
    // 评价食物的id
    evenationFoodId: String,
    // 添加的星星数字
    evenaNum: String,
    // 评价时间
    time: String,
    // 评价内容
    contentText: String

})