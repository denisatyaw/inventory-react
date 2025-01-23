'use strict';

const bcrypt = require('bcryptjs'); // Untuk hashing password

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Data admin default
    const adminUser = [
      {
        username: 'admin',
        password: await bcrypt.hash('admin123', 10), // Hash password
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Menyisipkan data admin ke tabel Users
    await queryInterface.bulkInsert('Users', adminUser, {});
  },

  async down(queryInterface, Sequelize) {
    // Menghapus data admin jika rollback
    await queryInterface.bulkDelete('Users', { username: 'admin' }, {});
  },
};
