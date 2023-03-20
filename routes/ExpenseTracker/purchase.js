const express = require('express');

const purchasePremium = require('../../controllers/ExpenseTracker/purchase');
const authy = require('../../authMiddleware/auth');

const router = express.Router();

router.get('/premiummembership', authy.authenticate, purchasePremium.getpurchasePremium);

router.post('/updatetransactionstatus', authy.authenticate, purchasePremium.postTransactionStatus);

module.exports = router;