
const Expense = require('../models/ExpenseModel.js');

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addExpense = async (req, res) => {
  const expense = new Expense({
    title: req.body.title,
    amount: req.body.amount,
    type: req.body.type,
    expenseId: req.body.expenseId
    
  });

  try {
    const newExpense = await expense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getExpenseById = async (req, res) => {
  const expenseId = req.params.id;

try {
  const expense = await Expense.findOne({ expenseId: expenseId });
  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }
  res.json(expense);
} catch (error) {
  res.status(500).json({ message: error.message });
}

};

