
const { Schema, model} = require('mongoose');

const goldRateINR = new Schema({
    currency:{
        type: String,
        required: true
    },
    price : {
        type: Number,
        required: true
    }
})
module.exports = model("goldINR",goldRateINR)