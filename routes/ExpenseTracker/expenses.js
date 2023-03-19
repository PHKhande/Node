const path = require('path');

const express = require('express');

const expenses = require('../../controllers/ExpenseTracker/expenses');

const router = express.Router();

router.get('/expenses/all', expenses.getAll);

router.post('/expense/add', expenses.postExpense);


module.exports = router;