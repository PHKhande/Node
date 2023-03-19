const path = require('path');

const express = require('express');

const expenses = require('../../controllers/ExpenseTracker/expenses');

const router = express.Router();

router.get('/all', expenses.getAll);

router.post('/add', expenses.postExpense);

router.delete('/:delId', expenses.delExpense);


module.exports = router;