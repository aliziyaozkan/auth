const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Header'dan token'ı al
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token bulunamadı veya yanlış format" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Token'ı doğrula
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // decoded içinde user id, email vs. var
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token geçersiz veya süresi dolmuş" });
  }
};

module.exports = authMiddleware;
