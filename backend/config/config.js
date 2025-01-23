require('dotenv').config(); // Memuat variabel dari .env

module.exports = {
  development: {
    username: process.env.DB_USER_DEV || 'root',
    password: process.env.DB_PASSWORD_DEV || 'rootpassword',
    database: process.env.DB_NAME_DEV || 'mydatabase',
    host: process.env.DB_HOST_DEV || 'mysql',
    port: process.env.DB_PORT_DEV || 3306,
    dialect: 'mysql',
  },
  test: {
    username: process.env.DB_USER_TEST || 'root',
    password: process.env.DB_PASSWORD_TEST || null,
    database: process.env.DB_NAME_TEST || 'database_test',
    host: process.env.DB_HOST_TEST || '127.0.0.1',
    port: process.env.DB_PORT_TEST || 3306,
    dialect: 'mysql',
  },
  production: {
    username: process.env.DB_USER_PROD || 'root',
    password: process.env.DB_PASSWORD_PROD || null,
    database: process.env.DB_NAME_PROD || 'database_production',
    host: process.env.DB_HOST_PROD || '127.0.0.1',
    port: process.env.DB_PORT_PROD || 3306,
    dialect: 'mysql',
  },
};
