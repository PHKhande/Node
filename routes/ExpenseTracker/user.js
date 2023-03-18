const path = require('path');

const express = require('express');

const userSignUp = require('../../controllers/ExpenseTracker/userController');

const router = express.Router();

router.post('/signup/user', userSignUp.postUserInfo);

module.exports = router;