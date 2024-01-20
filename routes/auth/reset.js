const jsonwebtoken = require('jsonwebtoken');
const User = require('../../modal/register')


const resetPass = async (req, res) => {
    try {
        const { password, confirmPassword } = req.body
        const token = req.params.token

        if (password !== confirmPassword) {
            return res.status(404).json({ message: "password must match" })
        } else {
            jsonwebtoken.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
                try {
                    if (err) {
                        return res.json({
                            message: "Error with token"
                        })
                    } else {

                        const hashPassword = await bcrypt.hash(password, 10)

                        const { id } = decoded

                        const updatePass = await User.findByIdAndUpdate(id, {
                            $set: {
                                password: hashPassword
                            }

                        },
                            {
                                new: true
                            }

                        )
                        res.send({ message: "Password changed succesfully", updatePass })
                    }
                } catch (error) {
                    console.log(error)
                    res.status(500).json({ message: "Control error" })
                }
            })
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = resetPass