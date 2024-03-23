const Expense = require('../models/ExpenseModel.js');

// Get all expenses sorted by date in descending order
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 }); // Sort by date in descending order
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Filter expenses by day, week, or month
exports.getExpensesByFilter = async (req, res) => {
  try {
    let startDate, endDate;
    const { filter } = req.query;

    if (filter === 'day') {
      startDate = new Date();
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date();
      endDate.setHours(23, 59, 59, 999);
    } else if (filter === 'week') {
      startDate = new Date();
      startDate.setDate(startDate.getDate() - startDate.getDay()); // Start of current week (Sunday)
      endDate = new Date();
      endDate.setDate(endDate.getDate() - endDate.getDay() + 6); // End of current week (Saturday)
      endDate.setHours(23, 59, 59, 999);
    } else if (filter === 'month') {
      startDate = new Date();
      startDate.setDate(1); // Start of current month
      endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1); // End of current month
      endDate.setDate(0); // Last day of current month
      endDate.setHours(23, 59, 59, 999);
    }

    const expenses = await Expense.find({
      date: { $gte: startDate, $lte: endDate }
    }).sort({ date: -1 }); // Sort by date in descending order

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add an expense
exports.addExpense = async (req, res) => {
  const expense = new Expense({
    title: req.body.title,
    amount: req.body.amount,
    type: req.body.type,
    expenseId: req.body.expenseId,
    label: req.body.label
  });

  try {
    const newExpense = await expense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get an expense by ID
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

// Delete an expense by expenseId
exports.deleteExpenseByExpenseId = async (req, res) => {
  const expenseId = req.params.expenseId;
  try {
    const expense = await Expense.findOneAndDelete({ expenseId });
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an expense by expenseId
exports.updateExpenseByExpenseId = async (req, res) => {
  const { title, amount, type, label, expenseId } = req.body;

  try {
    const updatedExpense = await Expense.findOneAndUpdate(
      { expenseId },
      { title, amount, type, label },
      { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
