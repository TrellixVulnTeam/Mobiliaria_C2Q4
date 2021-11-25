const Inm = require('../models/inmuebles')

const getInm = async(req, res, next)=>{
    try {
        const inmuebles = await Inm.find();
        res.status(200).json(inmuebles);
    } catch (error) {
        res.status(300).send(error);
    }
}

module.exports = getInm