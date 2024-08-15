require('dotenv').config()

const jwtConfig = {
    JWT_KEY: process.env.JWT_KEY,
    EXP_SES_SECRET: process.env.EXP_SES_SECRET
}

module.exports = jwtConfig;