const { sequelize } = require('../config/db');
const User = require('./User');
const Role = require('./Role');

// Definisikan relasi many-to-many
User.belongsToMany(Role, { through: 'UserRoles' });
Role.belongsToMany(User, { through: 'UserRoles' });

// Sinkronisasi model dengan database (opsional)
sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

module.exports = {
  User,
  Role,
};