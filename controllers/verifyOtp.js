const User = require('../models/user');
const Otp = require('../models/otp');

const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    const existingUser = await Otp.findOne({ email });

    if (!existingUser) {
        return res.json({ "msg": "Register first" });
    }

    // compare this.otp with existingUser.otp
    // if same, then set is_verified to true in User db collection
    const sentOtp = existingUser.otp;
    if (sentOtp == otp) {

        await User.findOneAndUpdate({ email }, { is_verified: true }, { new: true });

        // const user = await User.findOne({ email });
        // await user.updateOne({ email }, { is_verified: true });
        res.status(200).json({ "msg": "email verified" });
    }
}

module.exports = verifyOtp;
