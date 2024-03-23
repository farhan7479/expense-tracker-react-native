// expenseRoutes.js
const express = require('express');
const router = express.Router();
const { getExpenses, addExpense, getExpenseById , getExpensesByFilter, deleteExpenseByExpenseId, updateExpenseByExpenseId} = require('../controllers/ExpenseController.js');


router.get('/get-expenses', getExpenses);
router.get('/get-expense/:id', getExpenseById);
router.get('/filter', getExpensesByFilter);
router.delete('/delete/:expenseId', deleteExpenseByExpenseId);
router.put('/update', updateExpenseByExpenseId)

router.post('/add-expense', addExpense);

module.exports = router;
