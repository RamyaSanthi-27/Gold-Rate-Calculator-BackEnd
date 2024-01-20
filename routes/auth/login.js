const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../modal/register')


const loginUser =
    async (req, res) => {
        try {
            const { email, password } = req.body
            if (!email || !password) {
                return res.status(400).json({ message: "Please provide email and password" })
            }
            const findUser = await User.findOne({ email })
            if (!findUser) {
                res.status(400).json({ message: "User not registered. Kindly register to continue." })
            }
            if (!findUser.email_verified) {
                res.status(404).json({ message: "Please activate your account" })
            }
            const passwordValidate = await bcrypt.compare(password, findUser.password)

            if (!passwordValidate) {
                res.status(404).json({ message: "User or password not match" })
            }
            const token = jsonwebtoken.sign({ userID: findUser._id }, process.env.JWT_SECRET, { expiresIn: '1hr' })
            const { password: hashPassword, ...userData } = findUser._doc

            res.status(200).json({ message: 'Login successful', userData, token });

        } catch (error) {
            console.log(error)
        }
    }
module.exports = loginUser