var mon = require('mongoose');

const foodKind = require('../schemas/ADD_KIND');

module.exports = mon.model('add_foodkind', foodKind)