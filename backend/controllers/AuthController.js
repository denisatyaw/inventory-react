const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');
const ResponseApiHandler = require('../utils/ResponseApiHandler');

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

    // Jika user tidak ditemukan
    if (!user) {
      return ResponseApiHandler.error(res, 'Invalid username or password', null, 401);
    }

    // **Cek apakah user sudah dihapus (delUser = true / 1)**
    if (user.delUser === true || user.delUser === 1) {
      return ResponseApiHandler.notFound(res, 'Your account has been deactivated');
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

const checkSession = async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  console.log("token", token);
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Cek apakah token masuk dalam blacklist di Redis
    const isBlacklisted = await redisClient.get(`blacklist_${token}`);
    console.log("Is blacklisted:", isBlacklisted);
    if (isBlacklisted) {
      return res.status(403).json({ message: 'Session expired. Please login again.' });
    }

    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true });
    console.log("Decoded token:", decoded); // Lihat informasi dalam token untuk memastikan semuanya sesuai


    return res.status(200).json({ message: 'Session is active', user: decoded });
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

const refreshToken = async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(400).json({ message: 'Token is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true });

    // Buat token baru
    const newToken = jwt.sign(
      { userId: decoded.userId, username: decoded.username, role: decoded.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    

    return res.json({ message: 'Token refreshed', token: newToken });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Google Login Callback
const googleLoginCallback = async (req, res) => {
  try {
    let user = req.user; // User yang terautentikasi melalui Google OAuth

    if (!user) {
      return ResponseApiHandler.error(res, 'User not found or failed to authenticate with Google', null, 401);
    }

    // Jika user belum ada, buat user baru berdasarkan informasi Google
    if (!user.googleId) {
      user.googleId = req.user.id;
      await user.save();
    }

    // Tentukan role default jika login melalui Google
    const role = 'user'; // Set default role ke 'user'

    // Buat token JWT dengan informasi user dan role default
    const token = jwt.sign(
      { userId: user.id, username: user.username, role }, // Gunakan role default 'user'
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


module.exports = { 
  loginUser, 
  logoutUser, 
  checkSession, 
  refreshToken, 
  googleLoginCallback
};
