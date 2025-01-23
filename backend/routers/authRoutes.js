const express = require('express');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

// Endpoint login
router.post('/login', AuthController.login);

module.exports = router;
