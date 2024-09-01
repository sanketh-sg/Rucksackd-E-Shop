const express = require('express');
const router = express.Router();
const { registerUser,loginUser, logoutUser } = require('../controllers/authController')
const {updateUser} = require('../controllers/accountController')

router.post('/register',registerUser);

router.post('/login', loginUser)

router.get('/logout', logoutUser)

router.post('/update', updateUser)

module.exports = router;