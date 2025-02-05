const express = require('express');
const { loginUser, logoutUser, checkSession, refreshToken } = require('../controllers/AuthController');

const router = express.Router();



// Route untuk register
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/check-session', checkSession);
router.post('/refresh-token', refreshToken);

module.exports = router;
