const express = require('express');
const publicRoutes = require('./publicRoutes');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');

const router = express.Router();

// Menggabungkan rute dari file lain
router.use('/public', publicRoutes); 
router.use('/auth', authRoutes);     
router.use('/user', userRoutes);

module.exports = router;
