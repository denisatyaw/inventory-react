const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json"); 

const authRoutes = require('./routers/authRoutes'); 
const publicRoutes = require('./routers/publicRoutes');
const adminRoutes = require('./routers/adminRoutes');
const userRoutes = require('./routers/userRoutes');
const passport = require('./config/passport');

dotenv.config();

// Membuat instance aplikasi Express
const app = express();

// Konfigurasi express-session
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key', // Kunci rahasia untuk menandatangani sesi
  resave: false,             // Jangan menyimpan sesi jika tidak ada perubahan
  saveUninitialized: false,  // Jangan menyimpan sesi yang belum diinisialisasi
  cookie: { 
    httpOnly: true,          // Mencegah akses cookie melalui JavaScript di sisi klien
    secure: process.env.NODE_ENV === 'production' // Hanya kirim cookie melalui HTTPS di produksi
  }
}));

// Middleware Passport untuk autentikasi
app.use(passport.initialize());
app.use(passport.session());

// Middleware global
app.use(cors());
app.use(express.json());

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Route sederhana untuk menguji API
app.get('/', (req, res) => { 
  res.send('Backend is runnings!');
});

// Rute modular
app.use('/auth', authRoutes);   
app.use('/admin', adminRoutes); 
app.use('/public', publicRoutes); 
app.use('/user', userRoutes);

// Error handling global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Menjalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
