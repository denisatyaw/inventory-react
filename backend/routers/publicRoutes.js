const express = require('express');
const { getPublicInfo } = require('../controllers/publicController');

const router = express.Router();

// Rute publik
router.get('/info', getPublicInfo);

module.exports = router;
