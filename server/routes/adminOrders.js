
// routes/adminOrders.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Order = require('../models/Order');

// Only allow access to admins
router.use(auth, (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  next();
});

// GET all orders
router.get('/', async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 }).populate('userId', 'email name');
  res.json(orders);
});

// PUT update order status
router.put('/:id/status', async (req, res) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });

  order.status = status;
  await order.save();
  res.json(order);
});

// DELETE order by ID ✅
router.delete('/:id', async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });

  await order.deleteOne(); // or order.remove()
  res.json({ message: 'Order deleted successfully' });
});

module.exports = router;
