const nodemailer = require('nodemailer');
require('dotenv').config();

const User = require('../models/user.js');
const Otp = require('../models/otp.js');

// utils import
const otpGenerator = require('../utils/generateOtp.js');

const registerController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Create a new user
        const newUser = new User({ email, password });
        await newUser.save();


        // generate otp
        const otp = otpGenerator();

        // save email & generated otp to Otp db collection
        const otpSave = new Otp({ email, otp });
        await otpSave.save();

        // send otp using nodemailer
        const transporter = nodemailer.createTransport({
            // host: 'smtp.gmail.com',
            host: process.env.HOST,
            auth: {
                user: process.env.AUTH_USER,
                pass: process.env.AUTH_PASS
            }
        });

        const mailOptions = {
            from: process.env.AUTH_USER,
            to: email,
            subject: 'OTP Verification',
            html: '<p>Hii, your otp is: ' + otp + '</p>'
        }

        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.send(error.message);
            }

            else {
                res.status(200).send(`email sent: ${info.response}`);
            }
        });

    }



    catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'An error occurred while registering the user' });
    }
};

module.exports = registerController;
