const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

router.get('/', async (req, res) => {
  const expenses = await Expense.findAll({ order: [['date', 'DESC']] });
  res.json(expenses);
});

router.post('/', async (req, res) => {
  const { date, description, amount } = req.body;
  if (!date || !description || !amount) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const newExpense = await Expense.create({ date, description, amount });
  res.status(201).json(newExpense);
});

module.exports = router;
