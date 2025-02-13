const express = require('express');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');
const { getAdminDashboard } = require('../controllers/adminController');
const { addRoleToUser } = require('../controllers/userController');

const router = express.Router();

router.use(authenticateToken, authorizeRoles('admin'));

// Rute khusus admin
router.get('/dashboard', getAdminDashboard);

router.post('/auth/add-role', addRoleToUser);

module.exports = router;
