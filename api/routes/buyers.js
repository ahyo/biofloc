const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const Buyer = require("../models/Buyer");
const authMiddleware = require("../middleware/auth");

// Mendapatkan semua data buyer
router.get("/api/buyers", authMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Nomor halaman, default 1
    const limit = parseInt(req.query.limit) || 10; // Jumlah item per halaman, default 10

    // Hitung jumlah total buyer
    const totalBuyers = await Buyer.countDocuments();

    // Menghitung jumlah halaman berdasarkan totalBuyers dan limit
    const totalPages = Math.ceil(totalBuyers / limit);

    // Menghitung batas awal dan akhir data buyer yang akan diambil
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // Mengambil data buyer dengan pagination
    const buyers = await Buyer.find().skip(startIndex).limit(limit);
    const response = {
      buyers,
      currentPage: page,
      totalPages,
      totalBuyers,
    };
    res.json(response);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Mendapatkan data buyer berdasarkan ID
router.get("/api/buyers/:id", authMiddleware, async (req, res) => {
  try {
    const buyer = await Buyer.findById(req.params.id);
    if (!buyer) {
      return res.status(404).json({ message: "Buyer not found" });
    }
    res.json(buyer);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Membuat data buyer baru
router.post("/api/buyers", authMiddleware, async (req, res) => {
  try {
    const { username, password, email, registrationNumber } = req.body;

    // Periksa apakah username sudah ada
    const existingBuyer = await Buyer.findOne({ username });
    if (existingBuyer) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash password sebelum disimpan ke database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat buyer baru dalam database
    const buyer = new Buyer({
      username,
      password: hashedPassword,
      email,
      registrationNumber,
    });
    await buyer.save();

    res.status(201).json({ message: "Buyer created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Memperbarui data buyer berdasarkan ID
router.put("/api/buyers/:id", authMiddleware, async (req, res) => {
  try {
    const { username, password, email, registrationNumber } = req.body;

    const buyer = await Buyer.findById(req.params.id);
    if (!buyer) {
      return res.status(404).json({ message: "Buyer not found" });
    }

    buyer.username = username;
    buyer.password = await bcrypt.hash(password, 10);
    buyer.email = email;
    buyer.registrationNumber = registrationNumber;

    await buyer.save();

    res.json({ message: "Buyer updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error update" });
  }
});

// Menghapus data buyer berdasarkan ID
router.delete("/api/buyers/:id", authMiddleware, async (req, res) => {
  try {
    const buyer = await Buyer.findById(req.params.id);
    if (!buyer) {
      return res.status(404).json({ message: "Buyer not found" });
    }

    await buyer.remove();

    res.json({ message: "Buyer deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error delete" });
  }
});

module.exports = router;
