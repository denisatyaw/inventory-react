exports.getAdminDashboard = (req, res) => {
    res.json({
        message: `Welcome ${req.user.username}, this is the admin dashboard.`,
        user: req.user,
    });
};
  