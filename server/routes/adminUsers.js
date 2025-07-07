const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Admin-only
router.use(auth, (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  next();
});

router.get('/', async (req, res) => {
  const users = await User.find().select('-passwordHash');
  res.json(users);
});

router.post('/', async (req, res) => {
  const { name, email, password, role } = req.body;
  const exist = await User.findOne({ email });
  if (exist) return res.status(400).json({ message: 'Email exists' });
  const hash = await bcrypt.hash(password, 10);
  const newU = new User({ name, email, passwordHash: hash, role });
  await newU.save();
  res.status(201).json(newU);
});

router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

module.exports = router;
