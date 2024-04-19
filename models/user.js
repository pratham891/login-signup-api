const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  location: { type: String },
  age: { type: Number },
  work: { type: String },
  is_verified: {type: Boolean, default: false}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
