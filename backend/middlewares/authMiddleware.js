const jwt = require('jsonwebtoken');

// Middleware untuk memverifikasi token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Mendapatkan token dari header Authorization

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verifikasi token menggunakan JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Menyimpan data pengguna yang ada di token ke req.user
    next(); // Melanjutkan ke middleware atau handler berikutnya
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { authenticateToken };
