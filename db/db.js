const mongoose = require('mongoose');

const db_connect = async (url)=>{
    try {
        const connect= mongoose.connect(url)
        console.log("Database connected successfully")
    } catch (error) {
        console.log("mongo db error",error)
    }
}

module.exports = db_connect