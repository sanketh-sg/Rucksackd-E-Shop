const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/keys')
const userModel = require('../models/user');

module.exports = async (req,res,next) => {
    if(!req.cookies.token){
        req.flash('error','You need to login first');
        return res.redirect('/');
    }
    try{
        let decode = jwt.verify(req.cookies.token, jwtConfig.JWT_KEY);
        let user = userModel.findOne({email: decode.email}).select('-password');
        req.user = user;
        next();
    }catch(err){
        console.log(err);
        req.flash('error','Something went wrong in is Loggedin');
        res.redirect('/');
    }

};