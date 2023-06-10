const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

const User = require('../models/User');

// Route untuk register user baru
router.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Periksa apakah username sudah ada
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ status:0, message: 'Username already exists' });
    }

    // Hash password sebelum disimpan ke database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru dalam database
    const user = new User({
      username,
      password: hashedPassword,
      email,
      isAdmin: false
    });
    await user.save();

    res.status(201).json({ status:1, message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ status:0, message: 'Internal server error' });
  }
});

// Route untuk login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Cari user dalam database berdasarkan username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ status:0, message: 'Invalid username or password' });
    }

    // Periksa kecocokan password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ status:0, message: 'Invalid username or password' });
    }

    // Buat token JWT
    const token = jwt.sign({ username: user.username, isAdmin: user.isAdmin }, 'secret-key');

    res.json({status:1, token });
  } catch (err) {
    res.status(500).json({ status:0, message: 'Internal server error' });
  }
});

module.exports = router;
