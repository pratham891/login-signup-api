const jwt = require('jsonwebtoken');

const User = require('../models/user');

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }


        // Validate the password
        const userPass = user.password;
        if (password != userPass) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }


        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.secret_key);

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'An error occurred while logging in' });
    }
}

module.exports = loginController;
