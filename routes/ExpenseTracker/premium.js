const express = require('express');

const premiumController = require('../../controllers/ExpenseTracker/premium');
const download = require('../../controllers/ExpenseTracker/userController');
const authy = require('../../authMiddleware/auth');

const router = express.Router();

router.get('/allexpenses', authy.authenticate, premiumController.getAllExpensesFromDB);


router.get('/user/download', authy.authenticate, download.downloadExpense);


router.get('/user/download/all', authy.authenticate, download.downloadExpenseAll);

// router.post('/updatetransactionstatus', authy.authenticate, purchasePremium.postTransactionStatus);

module.exports = router;