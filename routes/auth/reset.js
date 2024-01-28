const jsonwebtoken = require('jsonwebtoken');
const User = require('../../modal/register')
const bcrypt = require('bcryptjs');



const resetPass = async (req, res) => {
    const {password}  = req.body
    console.log(password)
    try {
        const token = req.params.token
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

    } catch (error) {
        console.log(error)
    }
}

module.exports = resetPass