const { createClient } = require('@redis/client');

// Membuat dan mengonfigurasi Redis client
const redisClient = createClient({
  url: 'redis://redis:6379',  // Sesuaikan URL Redis jika menggunakan Docker atau Redis service lain
});

// Menangani error saat koneksi Redis
redisClient.on('error', (err) => {
  console.log('Redis Client Error', err);
});

// Menyambungkan client Redis
redisClient.connect();

module.exports = redisClient;
