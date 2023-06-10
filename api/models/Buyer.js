const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  registrationNumber: { type: String, required: true },
});

const Buyer = mongoose.model('Buyer', buyerSchema);

module.exports = Buyer;
