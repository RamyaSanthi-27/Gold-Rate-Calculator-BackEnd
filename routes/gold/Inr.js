const goldINR = require('../../modal/goldINR')


const goldInr = async(req,res)=>{
try {
    const {price} = req.body
    const goldPrice = new goldINR({
        currency : "INR",
        price
    })
    await goldPrice.save();
    res.status(200).send({ message: "Price updated successfully", data: goldPrice });

} catch (error) {
    console.log(error)
    res.status(400).send({message : "Cannot update price"})
}
}

const getINR = async(req,res)=>{
    try {
        const price = await goldINR.findOne({currency : "INR"})
        res.status(200).send({price : price})
    } catch (error) {
        console.log(error)
        res.status(400).send({message : "Cannot get price"})
    }
}
module.exports = goldInr
module.exports = getINR