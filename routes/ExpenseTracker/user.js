const express = require('express');

const userSignUp = require('../../controllers/ExpenseTracker/userController');
const FPassword = require('../../controllers/ExpenseTracker/frgtPassController')
const authy = require('../../authMiddleware/auth');

const router = express.Router();

router.post('/signup/user', userSignUp.signUp);

router.post('/login/user', userSignUp.login);

router.get('/user/info', authy.authenticate, userSignUp.getUserInfo);

router.post('/password/forgotpassword', FPassword.getResetEmailInfo)



module.exports = router;