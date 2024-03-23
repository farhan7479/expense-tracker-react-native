const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db.js");
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:8081' }));

const PORT = process.env.PORT || 5000;

const expenseRoutes = require('./routes/ExpenseRoute.js');

app.use('/expenses', expenseRoutes);

app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
