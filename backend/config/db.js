const { Sequelize } = require('sequelize');
const config = require('../config/config'); // Mengimpor file config.js
const env = process.env.NODE_ENV || 'development'; // Menentukan environment (development, test, production)
const dbConfig = config[env]; // Mengambil konfigurasi berdasarkan environment

// Membuat koneksi database menggunakan Sequelize
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
  logging: false, // Menonaktifkan logging query SQL
});

// Fungsi untuk menguji koneksi database
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Connected to ${env} database successfully.`);
  } catch (err) {
    console.error(`Failed to connect to ${env} database:`, err);
  }
};

// Menyinkronkan model dengan database
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true }); // Menyinkronkan model dan memperbarui tabel jika perlu
    console.log(`Database ${dbConfig.database} synchronized successfully.`);
  } catch (err) {
    console.error(`Failed to synchronize database ${dbConfig.database}:`, err);
  }
};

// Memanggil testConnection untuk memastikan koneksi saat aplikasi berjalan
// testConnection();
syncDatabase();

// Mengekspos sequelize dan fungsi tambahan
module.exports = { sequelize, testConnection, syncDatabase };
