const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  isAdmin: String
});

module.exports = mongoose.model('User', userSchema);
