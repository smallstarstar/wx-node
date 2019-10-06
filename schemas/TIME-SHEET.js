var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    people:String,

    peopleId: String,

    actions: String,

    time:String
});