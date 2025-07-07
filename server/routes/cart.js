
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Cart = require('../models/Cart');

// GET cart
router.get('/', authMiddleware, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.userId }).populate('items.product');
  res.json(cart || { items: [] });
});

// POST add item to cart
router.post('/', authMiddleware, async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.userId;

  let cart = await Cart.findOne({ user: userId });
  if (!cart) cart = new Cart({ user: userId, items: [] });

  const item = cart.items.find(i => i.product.equals(productId));
  if (item) item.quantity += 1;
  else cart.items.push({ product: productId, quantity: 1 });

  await cart.save();
  await cart.populate('items.product');
  res.json(cart);
});

// PUT update quantity
router.put('/', authMiddleware, async (req, res) => {
  const { productId, delta } = req.body;
  if (!productId || typeof delta !== 'number') {
    return res.status(400).json({ message: 'Invalid request' });
  }

  const cart = await Cart.findOne({ user: req.user.userId });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  const item = cart.items.find(i => i.product.equals(productId));
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      cart.items = cart.items.filter(i => !i.product.equals(productId));
    }
  }

  await cart.save();
  await cart.populate('items.product');
  res.json(cart);
});

// DELETE item from cart
router.delete('/:productId', authMiddleware, async (req, res) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: req.user.userId });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  cart.items = cart.items.filter(item => !item.product.equals(productId));
  await cart.save();
  await cart.populate('items.product');

  res.json(cart);
});

module.exports = router;
