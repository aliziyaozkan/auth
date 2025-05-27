const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/Blogs");
// Authentication middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"
  if (!token) return res.status(401).json({ message: "Token bulunamadı" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // userId ve email bilgileri
    next();
  } catch {
    res.status(401).json({ message: "Geçersiz token" });
  }
};

// Blog oluşturma endpoint'i
router.post("/create", authenticate, async (req, res) => {
  const { title, content, tags } = req.body;

  if (!title || !content) return res.status(400).json({ message: "Başlık ve içerik zorunlu" });

  try {
    const newBlog = new Blog({
      title,
      content,
      tags,
      authorId: req.user.id,
    });

    await newBlog.save();
    res.status(201).json({ message: "Blog yazısı oluşturuldu", blog: newBlog });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası" });
  }
});

// Blogları listeleme endpoint'i
router.get("/list", async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("authorId", "username email")
      .sort({ createdAt: -1 });

    res.json(blogs);
  } catch {
    res.status(500).json({ message: "Sunucu hatası" });
  }
});

module.exports = router;
