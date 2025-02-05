const express = require('express');
const { loginUser, logoutUser, checkSession, refreshToken, googleLoginCallback } = require('../controllers/AuthController');
const router = express.Router();
const passport = require('passport');

// Route untuk register
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/check-session', checkSession);
router.post('/refresh-token', refreshToken);

// Route untuk mengarahkan user ke Google untuk login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Route callback setelah login sukses di Google
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), googleLoginCallback);

module.exports = router;
