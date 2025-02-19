const { DataTypes } = require("sequelize");
const { sequelize } = require('../config/db');
const User = require('./User'); // Import User model

const Menu = sequelize.define("Menu", {
    menu_id: { type: DataTypes.STRING, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    parent_id: { type: DataTypes.STRING, allowNull: true },
    route: { type: DataTypes.STRING, allowNull: true },
    icon: { type: DataTypes.STRING, allowNull: true },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    created_by: { type: DataTypes.INTEGER, allowNull: false },
    updated_by: { type: DataTypes.INTEGER, allowNull: true },
    parent_order: { type: DataTypes.INTEGER, allowNull: true }, 
    submenu_order: { type: DataTypes.INTEGER, allowNull: true } 
}, {
    timestamps: true,
    tableName: "Menus"
});

// Define association
Menu.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });

module.exports = Menu;