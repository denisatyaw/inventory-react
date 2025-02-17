const express = require('express');
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');
const { validateRegisterUser } = require('../middlewares/validationMiddleware');

const router = express.Router();

// Route tanpa middleware
router.post('/register', validateRegisterUser, userController.registerUser);
router.put('/update/:userId', userController.updateUser);
router.get('/:username/roles', userController.getRolesByUsername);
router.post('/add-role', userController.addRoleToUser);
router.get('/get-roles', userController.getRoles);
router.post('/create-role', userController.createRole);


router.get('/get-users', authenticateToken, authorizeRoles('admin'), userController.getUsers);
router.patch('/delete/:userId', authenticateToken, authorizeRoles('admin'), userController.softDeleteUser);
router.patch('/restore/:userId', authenticateToken, authorizeRoles('admin'), userController.restoreUser);

module.exports = router;
