const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["Credit", "Debit"],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  expenseId: {
    type: String,
    required: true,
    unique: true
  },
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
