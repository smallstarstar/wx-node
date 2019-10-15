const mon = require('mongoose');


/**
 * 配置字典表数据
 */
module.exports = new mon.Schema({

    titleName: String,

    index: Number,

    IsUse: Boolean,

    people: String,

    peopleId: String,

    createdTime: String,
})