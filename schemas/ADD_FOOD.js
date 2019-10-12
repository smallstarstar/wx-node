var mon = require('mongoose');

module.exports = new mon.Schema({
    foodName: String,

    foodKind: String,

    foodPrice: String,

    foodPicture: String,

    foodDec: String,

    foodTime: String,

    createdPeo: String,

    createdId: String,

    foodCommand: Boolean
});