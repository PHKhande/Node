const express = require('express');

const premiumController = require('../../controllers/ExpenseTracker/premium');
const authy = require('../../authMiddleware/auth');

const router = express.Router();

router.get('/allexpenses', authy.authenticate, premiumController.getAllExpensesFromDB);

// router.post('/updatetransactionstatus', authy.authenticate, purchasePremium.postTransactionStatus);

module.exports = router;