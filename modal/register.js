
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        default: "",
    },
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
    goals: {
        type: String,
        required: true,
    },
    food:{
        type : String,
        required :true,
    },
    gender: {
        type: String,
        required: true,
    },
    age :{
        type: Number,
        required: true,
    },
    activationLevel :{
        type: String,
        required: true,
    },
    weight : {
        type: Array,
        required: true,
    },
    height : {
        type: Array,
        required: true,
    },
    healthConditionCategory : {
        type: String,
        required: true,
    },
    healthCondition : {
        type: String,
        required: true,
    }
})
module.exports = model("users",userSchema)