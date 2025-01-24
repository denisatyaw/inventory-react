const express = require('express');
const publicRoutes = require('./publicRoutes');
const authRoutes = require('./authRoutes');

const router = express.Router();

// Menggabungkan rute dari file lain
router.use('/public', publicRoutes); // Prefix /public
router.use('/auth', authRoutes);     // Prefix /auth

module.exports = router;
