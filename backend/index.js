const express = require('express');
const cors = require('cors');
const { testConnection } = require('./config/db'); 
const { Sequelize } = require('sequelize');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Mengimpor model User
const dotenv = require('dotenv');

dotenv.config();
// Membuat instance aplikasi Express
const app = express();

app.use(cors());

// Middleware untuk meng-handle JSON request body
app.use(express.json());

// Mengecek koneksi ke database MySQL
testConnection(); // Menjalankan testConnection untuk menguji koneksi database

// Route sederhana untuk menguji API
app.get('/', (req, res) => { 
  res.send('Backend is runnings!');
});

// Route untuk register
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Mengecek apakah username sudah ada di database
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Membuat pengguna baru dengan menggunakan model User
    const newUser = await User.create({ username, password });

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: newUser.id, username: newUser.username },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


// Route untuk login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Mencari pengguna berdasarkan username
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Memverifikasi password
    const isValid = await user.isValidPassword(password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Membuat JWT jika password valid
    const token = jwt.sign(
      { userId: user.id, username: user.username }, // Payload
      process.env.JWT_SECRET, // Secret untuk menandatangani token
      { expiresIn: '1h' } // Token akan expired dalam 1 jam
    );

    res.json({ token }); // Mengirim token sebagai respon
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// API untuk mengecek koneksi ke database
app.get('/check-db-connection', (req, res) => {
  sequelize.authenticate()
    .then(() => {
      res.json({ message: 'Database connection is successful' });
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to connect to the database', error: err.message });
    });
});

// Menjalankan server di port 5000
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
