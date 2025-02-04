const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');
const ResponseApiHandler = require('../utils/ResponseApiHandler');
const redisClient = require('../config/redis');


const loginUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Periksa apakah role ada di request body
    if (!role) {
      return ResponseApiHandler.error(res, 'Role is required', null, 400);
    }

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
    if (!roles.includes(role)) {
      return ResponseApiHandler.error(res, 'User does not have the selected role', null, 403);
    }

    // Buat token JWT dengan informasi user dan role yang dipilih
    const token = jwt.sign(
      { userId: user.id, username: user.username, role }, // Gunakan hanya role yang dipilih
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


const logoutUser = async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Ambil token dari header Authorization

  if (!token) {
    return ResponseApiHandler.error(res, 'Token is required', null, 400);
  }

  try {
    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Gunakan set() dengan opsi EX untuk kedaluwarsa
    await redisClient.set(`blacklist_${token}`, token, 'EX', decoded.exp - Math.floor(Date.now() / 1000));

    // Kirimkan response sukses
    return ResponseApiHandler.success(res, 'Logout successful', null);
  } catch (err) {
    console.error(err);
    return ResponseApiHandler.error(res, 'Server error', err.message);
  }
};

module.exports = { loginUser, logoutUser };
