const express = require('express');
const { registerUser, addRoleToUser, getRolesByUsername, updateUser, softDeleteUser, restoreUser } = require('../controllers/userController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');

const router = express.Router();

// Route untuk register
router.post('/register', registerUser);
router.put('/update/:userId', updateUser);
router.post('/add-role', addRoleToUser);
router.patch('/delete/:userId', authenticateToken, authorizeRoles('admin'), softDeleteUser);
router.patch('/restore/:userId', authenticateToken, authorizeRoles('admin'), restoreUser);
router.get('/:username/roles', getRolesByUsername);

module.exports = router;
