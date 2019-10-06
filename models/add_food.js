var mongoose = require('mongoose');

var addFood = require('../schemas/ADD_FOOD');

module.exports = mongoose.model('add_food', addFood);