var mon = require('mongoose');

var addEvenation = require('../schemas/ADD_EVENATION');

module.exports = mon.model('add_evenation', addEvenation);