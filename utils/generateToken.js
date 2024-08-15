const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/keys')
const generateToken = (user) => {
    return jwt.sign({ email: user.email, id: user._id},jwtConfig.JWT_KEY);
};

module.exports.generateToken = generateToken;