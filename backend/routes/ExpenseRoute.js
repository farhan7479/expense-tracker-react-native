// expenseRoutes.js
const express = require('express');
const router = express.Router();
const { getExpenses, addExpense, getExpenseById } = require('../controllers/ExpenseController.js');

// GET all expenses
router.get('/get-expenses', getExpenses);
router.get('/get-expense/:id', getExpenseById);

// POST new expense
router.post('/add-expense', addExpense);

module.exports = router;
