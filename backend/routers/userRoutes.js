const express = require('express');
const { registerUser, addRoleToUser, getRolesByUsername, updateUser, softDeleteUser, restoreUser } = require('../controllers/userController');

const router = express.Router();

// Route untuk register
router.post('/register', registerUser);
router.put('/update/:userId', updateUser);
router.post('/add-role', addRoleToUser);
router.patch('/delete/:userId', softDeleteUser);
router.patch('/restore/:userId', restoreUser);
router.get('/:username/roles', getRolesByUsername);

module.exports = router;
