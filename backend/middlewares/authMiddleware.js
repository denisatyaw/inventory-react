const jwt = require('jsonwebtoken');
const redisClient = require('../config/redis');
const ResponseApiHandler = require('../utils/ResponseApiHandler');

// Middleware untuk memverifikasi token dan memeriksa blacklist
const authenticateToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Mendapatkan token dari header Authorization

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verifikasi token menggunakan JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Periksa apakah token ada di Redis blacklist
    const isBlacklisted = await redisClient.get(`blacklist_${token}`);
    if (isBlacklisted) {
      return ResponseApiHandler.error(res, 'Token has been invalidated (logged out)', null, 401);
    }

    req.user = decoded; // Menyimpan data pengguna yang ada di token ke req.user

    console.log('decoded', decoded);
    next(); // Melanjutkan ke middleware atau handler berikutnya
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { authenticateToken };
