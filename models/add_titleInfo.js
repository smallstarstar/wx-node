const mon = require('mongoose');

const titleInfo = require('../schemas/ADD_TITLE_INFO');

module.exports = mon.model('add_titleInfo', titleInfo);