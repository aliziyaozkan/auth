const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); // JSON gövde parsing için mutlaka ekle

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
const blogRoutes = require('./routes/blog');
app.use('/api/blog', blogRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB bağlantısı başarılı"))
  .catch(err => console.log("MongoDB bağlantı hatası", err));

app.listen(process.env.PORT, () => {
  console.log(`Server ${process.env.PORT} portunda çalışıyor`);
});


