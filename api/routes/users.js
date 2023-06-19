const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/User");
const authMiddleware = require("../middleware/auth");

// Mendapatkan semua data buyer
router.get("/api/users", authMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Nomor halaman, default 1
    const limit = parseInt(req.query.limit) || 10; // Jumlah item per halaman, default 10

    const totalUsers = await User.countDocuments();

    const totalPages = Math.ceil(totalUsers / limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // Mengambil data buyer dengan pagination
    const users = await User.find().skip(startIndex).limit(limit);
    const response = {
      users,
      currentPage: page,
      totalPages,
      totalUsers,
    };
    res.json(response);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Mendapatkan data buyer berdasarkan ID
router.get("/api/users/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Membuat data buyer baru
router.post("/api/users", authMiddleware, async (req, res) => {
  try {
    const { username, password, email, isAdmin } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
      email,
      isAdmin,
    });
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Memperbarui data buyer berdasarkan ID
router.put("/api/users/:id", authMiddleware, async (req, res) => {
  try {
    const { username, password, email, isAdmin } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.username = username;
    user.password = await bcrypt.hash(password, 10);
    user.email = email;
    user.isAdmin = isAdmin;

    await user.save();

    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error update" });
  }
});

// Menghapus data buyer berdasarkan ID
router.delete("/api/users/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.remove();

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error delete" });
  }
});

module.exports = router;
