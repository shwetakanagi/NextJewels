
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Order = require('../models/Order');
const Cart = require('../models/Cart');

router.post('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const items = req.body.items;
    if (!items || items.length === 0) return res.status(400).json({ message: 'Cart empty' });

    const total = items.reduce((sum, i) => sum + i.quantity * i.product.price, 0);

    const order = new Order({ userId, items, total });
    await order.save();

    // Clear cart
    await Cart.findOneAndUpdate({ user: userId }, { $set: { items: [] } });

    res.status(201).json({ message: 'Order placed', orderId: order._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete order by ID (only owner can delete)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const orderId = req.params.id;

    // Find order by id and user
    const order = await Order.findOne({ _id: orderId, userId });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    await Order.deleteOne({ _id: orderId });
    res.json({ message: 'Order deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
