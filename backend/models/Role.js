const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Role = sequelize.define('Role', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Nama role harus unik
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Role;