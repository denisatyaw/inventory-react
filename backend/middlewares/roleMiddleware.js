// Middleware untuk memeriksa role pengguna
exports.authorizeRoles = (...allowedRoles) => (req, res, next) => {
  // Periksa apakah 'req.user' ada (token telah divalidasi)
  if (!req.user || !req.user.role) {
    return res.status(403).json({ message: 'Access denied. No role found in token.' });
  }

  const userRole = req.user.role; // Role dari token yang sudah diparser

  console.log("Hasil role token:", userRole);
  
  // Cek apakah role pengguna ada dalam allowedRoles
  if (!allowedRoles.includes(userRole)) {
    return res.status(403).json({ message: 'Access denied. You do not have the required role.' });
  }

  // Jika role ada dalam allowedRoles, lanjutkan ke middleware/handler berikutnya
  next();
};
