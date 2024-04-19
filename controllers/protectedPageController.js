const User = require('../models/user');

const procController = async (req, res) => {
    const email = req.headers.email;

    // Handle protected route logic here
    try {
        // res.json({ "msg": "Welcome in protected view" });
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            res.status(404).json({ "msg": "User doesn't exist" });
        }
        else {
            res.status(200).json({ existingUser });
        }
    }

    catch {
        res.json({ "error": "can't enter protected view" });
    }
}

module.exports = procController;
