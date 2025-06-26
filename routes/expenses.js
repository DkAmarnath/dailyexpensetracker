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

// Update an expense
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { date, description, amount } = req.body;
    const expense = await Expense.findByPk(id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    expense.date = date;
    expense.description = description;
    expense.amount = amount;
    await expense.save();

    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update expense' });
  }
});


// Delete an expense
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const expense = await Expense.findByPk(id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    await expense.destroy();
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete expense' });
  }
});




module.exports = router;
