const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');
const ResponseApiHandler = require('../utils/ResponseApiHandler');

// Fungsi untuk register user
const registerUser = async (req, res) => {
  const { username, password, roles } = req.body;

  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return ResponseApiHandler.error(res, 'Username already exists', null, 400);
    }

    const newUser = await User.create({ username, password });

    if (roles && roles.length > 0) {
      const roleRecords = await Role.findAll({ where: { name: roles } });
      await newUser.addRoles(roleRecords);
    } else {
      const defaultRole = await Role.findOne({ where: { name: 'user' } });
      if (defaultRole) {
        await newUser.addRole(defaultRole);
      }
    }

    return ResponseApiHandler.success(res, 'User registered successfully', {
      id: newUser.id,
      username: newUser.username,
    }, 201);
  } catch (err) {
    console.error(err);
    return ResponseApiHandler.error(res, 'Server error', err.message);
  }
};

// Fungsi untuk login user
const loginUser = async (req, res) => {
  const { username, password, role } = req.body;

  console.log("username", username);
  console.log("password", password);
  console.log("role", role);

  try {
    // Cari user berdasarkan username dan sertakan roles
    const user = await User.findOne({
      where: { username },
      include: Role, // Pastikan 'Role' di-include
    });

    if (!user) {
      return ResponseApiHandler.error(res, 'Invalid username or password', null, 401);
    }

    // Cek apakah password valid
    const isValid = await user.isValidPassword(password);
    if (!isValid) {
      return ResponseApiHandler.error(res, 'Invalid username or password', null, 401);
    }

    // Ambil nama role yang dimiliki oleh user
    const roles = user.Roles.map((role) => role.name);

    // Cek apakah role yang dipilih ada di dalam daftar roles user
    if (role && !roles.includes(role)) {
      return ResponseApiHandler.error(res, 'User does not have the selected role', null, 403);
    }

    // Buat token JWT dengan informasi user dan roles
    const token = jwt.sign(
      { userId: user.id, username: user.username, roles },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Set expired time sesuai kebutuhan
    );

    // Kirim response dengan token
    return ResponseApiHandler.success(res, 'Login successful', { token });
  } catch (err) {
    console.error(err);
    return ResponseApiHandler.error(res, 'Server error', err.message);
  }
};


// Fungsi untuk menambahkan role ke user
const addRoleToUser = async (req, res) => {
  const { userId, role } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return ResponseApiHandler.error(res, 'User not found', null, 404);
    }

    const roleRecord = await Role.findOne({ where: { name: role } });
    if (!roleRecord) {
      return ResponseApiHandler.error(res, 'Role not found', null, 404);
    }

    await user.addRole(roleRecord);

    return ResponseApiHandler.success(res, `Role ${role} added to user ${user.username}`);
  } catch (err) {
    console.error(err);
    return ResponseApiHandler.error(res, 'Server error', err.message);
  }
};

// Fungsi untuk mendapatkan role berdasarkan username
const getRolesByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({
      where: { username },
      include: Role, // Menggunakan `Role` untuk memuat relasi antara User dan Role
    });

    if (!user) {
      return ResponseApiHandler.error(res, 'User not found', null, 404);
    }

    // Mengambil semua nama role yang dimiliki oleh user
    const roles = user.Roles.map((role) => role.name);

    return ResponseApiHandler.success(res, 'Roles retrieved successfully', { roles });
  } catch (err) {
    console.error(err);
    return ResponseApiHandler.error(res, 'Server error', err.message);
  }
};

module.exports = { registerUser, loginUser, addRoleToUser, getRolesByUsername };

