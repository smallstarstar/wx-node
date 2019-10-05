var mon = require('mongoose');

module.exports = new mon.Schema({
    userName: String,

    userPhone: String,

    userPassword: String,

    userTime: String,

    userAddress: String,

    userEmail: String,

    userRole: String
})