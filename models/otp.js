const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: {type: String},
    otp: String
});

const Otp = new mongoose.model('Otp', otpSchema);

module.exports = Otp;
