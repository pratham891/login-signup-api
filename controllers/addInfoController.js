const User = require('../models/user');

const addInfoController = async (req, res) => {
    const email = req.headers.email;
    const { location, age, work } = req.body;

    try {
        // check if is_verified is true in User db collection

        const isVerified = await User.findOne({ email });
        // console.log(isVerified);

        if (isVerified.is_verified) {
            // if true, then following steps
            const existingUser = await User.findOneAndUpdate(
                { email },
                { location, age, work },
                { new: true }
            );

            if (!existingUser) {
                return res.status(404).json({ "msg": "user not found" });
            }

            else {
                res.status(200).json(existingUser);
            }
        } else {
            res.json({ "msg": "Please verify email with otp first" });
        }


    }

    catch {
        res.json({ "error": "can not fill data" });
    }
}

module.exports = addInfoController;
