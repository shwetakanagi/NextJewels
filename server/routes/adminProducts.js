const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Product = require('../models/Product');

// Admin-only middleware
router.use(auth, (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  next();
});

// GET all products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// CREATE product
router.post('/', async (req, res) => {
  const { name, price, description, category, image } = req.body;
  const newP = new Product({ name, price, description, category, image });
  await newP.save();
  res.status(201).json(newP);
});

// DELETE product
router.delete('/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product removed' });
});

module.exports = router;
