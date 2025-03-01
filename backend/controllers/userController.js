const { Op } = require('sequelize'); 
const { User, Role } = require('../models');
const ResponseApiHandler = require('../utils/ResponseApiHandler');

// Fungsi untuk register user
const registerUser = async (req, res) => {
  const { username, password, email, address, phone, roles } = req.body;

  try {
    // Periksa apakah username atau email sudah digunakan
    console.log("body from FE", req.body);
    const existingUser = await User.findOne({ 
      where: { 
        [Op.or]: [{ username }, { email }] 
      } 
    });

    if (existingUser) {
      return ResponseApiHandler.error(res, 'Username or Email already exists', null, 400);
    }

    // Membuat pengguna baru dengan informasi tambahan
    const newUser = await User.create({ 
      username, 
      password, 
      email, 
      address, 
      phone
    });

    // Menangani peran pengguna (roles)
    if (roles && roles.length > 0) {
      const roleRecords = await Role.findAll({ where: { name: roles } });
      await newUser.addRoles(roleRecords);
    } else {
      // Jika tidak ada role yang diberikan, tambahkan role default dengan ID 2
      const defaultRole = await Role.findByPk(2); // Role ID default adalah 2
      if (defaultRole) {
        await newUser.addRole(defaultRole);
      } else {
        throw new Error('Default role not found');
      }
    }

    return ResponseApiHandler.success(res, 'User registered successfully', {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      address: newUser.address,
      phone: newUser.phone
    }, 201);

  } catch (err) {
    console.error(err);
    return ResponseApiHandler.error(res, 'Server error', err.message);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: Role,
    });

    return ResponseApiHandler.success(res, 'Users retrieved successfully', { users });
  } catch (err) {
    return ResponseApiHandler.error(res, 'Server error', err.message);
  }
};


// Fungsi untuk menambahkan role ke user
const addRoleToUser = async (req, res) => {
  const { username, role } = req.body;

  try {
      const user = await User.findOne({ where: { username } });
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

// Fungsi untuk mengupdate user
const updateUser = async (req, res) => {
    const { userId } = req.params;
    const { username, email, address, phone } = req.body;
  
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return ResponseApiHandler.error(res, 'User not found', null, 404);
      }
  
      await user.update({ username, email, address, phone });
  
      return ResponseApiHandler.success(res, 'User updated successfully', {
        id: user.id,
        username: user.username,
        email: user.email,
        address: user.address,
        phone: user.phone,
      });
    } catch (err) {
      return ResponseApiHandler.error(res, 'Server error', err.message);
    }
};
  
// Fungsi untuk menghapus user (soft delete)
const softDeleteUser = async (req, res) => {
    const { userId  } = req.params;
  
    console.log('userId ', userId );
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return ResponseApiHandler.error(res, 'User not found', null, 404);
      }
  
      user.delUser = true;
      await user.save();
  
      return ResponseApiHandler.success(res, 'User successfully deactivated');
    } catch (err) {
      console.error(err);
      return ResponseApiHandler.error(res, 'Server error', err.message);
    }
};
  
// Fungsi untuk mengembalikan user yang dihapus
const restoreUser = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return ResponseApiHandler.error(res, 'User not found', null, 404);
      }
  
      await user.update({ delUser: false });
  
      return ResponseApiHandler.success(res, `User ${user.username} restored successfully`);
    } catch (err) {
      return ResponseApiHandler.error(res, 'Server error', err.message);
    }
};

const createRole = async (req, res) => {
  const { name } = req.body;

  try {
    const role = await Role.create({ name });

    return ResponseApiHandler.success(res, 'Role created successfully', {
      id: role.id,
      name: role.name,
    }, 201);
  } catch (err) {
    return ResponseApiHandler.error(res, 'Server error', err.message);
  }
};

const getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();

    return ResponseApiHandler.success(res, 'Roles retrieved successfully', { roles });
  } catch (err) {
    return ResponseApiHandler.error(res, 'Server error', err.message);
  }
};

module.exports = {
  registerUser, 
  getUsers,
  addRoleToUser, 
  getRolesByUsername, 
  updateUser, 
  softDeleteUser, 
  restoreUser,
  createRole,
  getRoles
};

