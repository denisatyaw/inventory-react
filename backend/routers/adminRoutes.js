const express = require('express');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');
const { getAdminDashboard } = require('../controllers/adminController');
const { addRoleToUser } = require('../controllers/authController');

const router = express.Router();

// Rute khusus admin
router.get('/dashboard', authenticateToken, authorizeRoles('admin'), getAdminDashboard);

// AUTH after login
router.post('/auth/add-role', authenticateToken, authorizeRoles('admin'), addRoleToUser);

module.exports = router;
