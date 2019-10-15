/**
 * 配置
 * @param {*} passport 
 */
const mon = require('mongoose');
var userInfo = require('../schemas/USER_INFO');
const User = mon.model('user_info', userInfo);
const KeyName = require('../config/keys')
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = KeyName.selectKey;



module.exports = passport =>{
    passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
        User.findById(jwt_payload.id).then((val)=>{
            if(val) {
                return done(null,val);
            }
            return done(null,false);
        })
    }))
}