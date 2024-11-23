const express = require('express');
const app = express();
const dotenv = require('dotenv');
const expressLayouts = require('express-ejs-layouts'); // Tambahkan middleware express-ejs-layouts

dotenv.config();

// Middleware
app.set('view engine', 'ejs'); // Set EJS sebagai template engine
app.use(expressLayouts); // Aktifkan express-ejs-layouts
app.set('layout', 'layouts/main-layout'); // Default layout menggunakan main-layout.ejs
app.use(express.urlencoded({ extended: false })); // Parsing form data
app.use(express.json()); // Parsing JSON

// Routes
const authRoutes = require('./routes/authroutes');
const pasienRoutes = require('./routes/pasienroutes');
app.use('/', authRoutes); // Routes untuk login dan signup
app.use('/pasien', pasienRoutes); // Routes untuk CRUD pasien

// Jalankan server
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});