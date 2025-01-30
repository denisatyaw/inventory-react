const ResponseApiHandler = require('../utils/ResponseApiHandler');

exports.getAdminDashboard = (req, res) => {
    if (!req.user) {
        return ResponseApiHandler.unauthorized(res, 'Invalid or expired token.');
    }

    return ResponseApiHandler.success(res, `Welcome ${req.user.username}, this is the admin dashboard.`, {
        user: req.user,
    });
};
