// Middleware untuk memeriksa role pengguna
exports.authorizeRoles = (...allowedRoles) => (req, res, next) => {
  const userRoles = req.user.roles; // Roles dari token

  const hasAccess = userRoles.some((role) => allowedRoles.includes(role));
  if (!hasAccess) {
    return res.status(403).json({ message: 'Access denied' });
  }

  next();
};
  

  