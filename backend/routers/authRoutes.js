const express = require('express');
const { registerUser, loginUser, getRolesByUsername } = require('../controllers/authController');

const router = express.Router();

// Route untuk register
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:username/roles', getRolesByUsername);

module.exports = router;
