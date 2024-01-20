const jsonwebtoken = require('jsonwebtoken');
const User = require('../../modal/register')

const activateUser = async (req, res) => {
    try {
        const { email, token } = req.params
        jsonwebtoken.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid or expired token" })
            }
            const activateUser = await User.updateOne({
                email, email_verified: false
            }, {
                $set: { email_verified: true }
            })

            if (activateUser.modifiedCount === 1) {
                res.redirect(`https://gold-rate-calculator-frontend.vercel.app`)
            } else {
                res.status(404).json({
                    message: "User not found or account is already activated"
                })
            }
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
module.exports = activateUser