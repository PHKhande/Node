const express = require('express');

const expenses = require('../../controllers/ExpenseTracker/expenses');
const authy = require('../../authMiddleware/auth');

const router = express.Router();

router.get('/all', authy.authenticate, expenses.getAllExpenses);

router.post('/add', authy.authenticate, expenses.postExpense);

router.delete('/:delId', authy.authenticate, expenses.delExpense);

module.exports = router;