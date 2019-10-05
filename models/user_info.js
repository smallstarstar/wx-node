var mongoose = require('mongoose');

var userInfo = require('../schemas/USER_INFO');

module.exports = mongoose.model('user_info', userInfo);

