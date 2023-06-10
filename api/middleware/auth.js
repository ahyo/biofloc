const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Mendapatkan token dari header Authorization
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ status: 0, message: 'No token provided' });
  }

  try {
    // Verifikasi token
    const decoded = jwt.verify(token, 'secret-key');

    // Menyimpan data pengguna dari token ke dalam objek req.user
    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({ status:0, message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
