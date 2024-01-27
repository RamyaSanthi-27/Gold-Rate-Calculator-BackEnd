
const { Schema, model } = require('mongoose');
//const router = express.Router();
//import bcrypt from "bcryptjs";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email_verified: {
        type: Boolean,
        default: false,
    },
    username: {
        type: String,
        required: true,
    },
})
module.exports = model("users",userSchema)