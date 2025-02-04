const express = require('express');
const { loginUser, logoutUser } = require('../controllers/authController');

const router = express.Router();

// Route untuk register
router.post('/login', loginUser);
router.post('/logout', logoutUser);

module.exports = router;
