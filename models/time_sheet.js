var mongoose = require('mongoose');

var timeSheet = require('../schemas/TIME-SHEET');

module.exports = mongoose.model('time_sheet', timeSheet);