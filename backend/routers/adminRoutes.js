const express = require('express');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');
const { getAdminDashboard } = require('../controllers/adminController');
const { addRoleToUser } = require('../controllers/userController');

const router = express.Router();

// Rute khusus admin
router.get('/dashboard', authenticateToken, authorizeRoles('Admin'), getAdminDashboard);

router.post('/auth/add-role', authenticateToken, authorizeRoles('Admin'), addRoleToUser);

module.exports = router;
