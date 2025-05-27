const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Email formatını kontrol eden regex
const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Kayıt
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, repassword } = req.body;

    // Kullanıcı zaten var mı kontrol et
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email zaten kayıtlı" });

     // Email formatı geçerli mi?
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Geçersiz email formatı" });
    }

    // Şifre ve tekrar şifre eşleşiyor mu?
    if (password !== repassword) {
      return res.status(400).json({ message: "Şifreler eşleşmiyor" });
    }

    // Şifreyi hashle
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Yeni kullanıcı oluştur
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "Kayıt başarılı" });
  } catch (err) {
    res.status(500).json({ message: "Sunucu hatası" });
  }
});

// Giriş
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kullanıcıyı bul
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Kullanıcı bulunamadı" });

    // Şifre kontrol
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Şifre yanlış" });

    // JWT token oluştur
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Sunucu hatası" });
  }
});

module.exports = router;
