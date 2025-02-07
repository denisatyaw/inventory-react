const express = require('express');
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');
const { validateRegisterUser } = require('../middlewares/validationMiddleware');

const router = express.Router();

// Route untuk register
router.post('/register', validateRegisterUser, userController.registerUser);
router.get('/get-users', authenticateToken, authorizeRoles('admin'), userController.getUsers);
router.put('/update/:userId', userController.updateUser);
router.patch('/delete/:userId', authenticateToken, authorizeRoles('admin'), userController.softDeleteUser);
router.patch('/restore/:userId', authenticateToken, authorizeRoles('admin'), userController.restoreUser);
router.get('/:username/roles', userController.getRolesByUsername);
router.post('/add-role', userController.addRoleToUser);
router.get('/get-roles', userController.getRoles);
router.post('/create-role', userController.createRole);

module.exports = router;
