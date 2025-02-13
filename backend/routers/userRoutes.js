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

// Middleware untuk rute yang membutuhkan autentikasi
router.use(authenticateToken);

router.get('/get-users', authorizeRoles('admin'), userController.getUsers);
router.patch('/delete/:userId', authorizeRoles('admin'), userController.softDeleteUser);
router.patch('/restore/:userId', authorizeRoles('admin'), userController.restoreUser);

module.exports = router;
