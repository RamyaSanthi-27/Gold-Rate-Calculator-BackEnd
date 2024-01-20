const registerSchema = require("../../Schema/register");
const bcrypt = require("bcryptjs");
const User = require("../../modal/register");
const jsonwebtoken = require("jsonwebtoken");
const transporter = require("../../helpers/transporter");

const registerUser = async (req, res) => {
  try {
    const {
      email,
      password,
      username,
    } = req.body;
    const validationResult = registerSchema.validate(req.body);
    if (validationResult.error) {
      return res
        .status(400)
        .json({ error: validationResult.error.details[0].message });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
     
      email,
      password: hashPassword,
      username,
    
  
    });
    const token = jsonwebtoken.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const activateUrl = `https://goldrate-calculator-687v.onrender.com/api/activate-account/${email}/${token}`;

    const info = await transporter.sendMail({
      from: process.env.mail,
      to: email,
      subject: "Activation Link",
      text: `Click the following link to Activate your account: ${activateUrl}`,
    });
    await newUser.save();
    res.status(200).json({ token, message: "Registration successful" });
  } catch (error) {
    console.log(error);
    res.send({ message: "Error on registration" }).status(500);
  }
};

module.exports = registerUser;
