const express = require('express');


const app = express();
const port = 3000;

const cors = require('cors');

app.use(cors());

// Middleware untuk memproses body dalam format JSON
app.use(express.json());

// Impor dan gunakan router auth
const authRoutes = require('./routes/auth');
app.use(authRoutes);

// Impor dan gunakan router buyer
const buyerRoutes = require('./routes/buyers');
app.use(buyerRoutes);

// Impor dan gunakan fungsi koneksi database
const connectDB = require('./config/db');
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
});
