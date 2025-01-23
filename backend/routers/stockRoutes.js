// routes/stockRoutes.js
const express = require('express');
const { authenticate, authorize } = require('../middlewares/auth');
const StockController = require('../controllers/StockController');

const router = express.Router();

// Hanya admin atau staff yang bisa menambah stok
router.post('/add', authenticate, authorize(['admin', 'staff']), StockController.addStock);

module.exports = router;
