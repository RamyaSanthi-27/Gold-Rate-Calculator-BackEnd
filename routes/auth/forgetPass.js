const jsonwebtoken = require('jsonwebtoken');
const User = require('../../modal/register')

const transporter = require('../../helpers/transporter');


const forgotPass = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "User not registered" })
        }
        const token = jsonwebtoken.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1hr" });
        await User.updateOne({ email }, {
            $set: { token }
        })

        const info = await transporter.sendMail({
            from: process.env.mail,
            to: email,
            subject: 'Reset password link',
            text: `Click the following link to reset your password: https://gold-rate-calculator-frontend.vercel.app/reset-password/${token}`
        });

        res.status(200).json({ message: 'Password reset link sent successfully. And check Your Registered Mail to Continue' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'User not registered or check email' });
    }
}

module.exports = forgotPass