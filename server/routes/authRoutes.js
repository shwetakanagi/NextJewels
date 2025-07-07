const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.get('/dashboard', authMiddleware, authController.getDashboard);

module.exports = router;
