const Inm = require('../models/inmuebles')

const getInm = async(req, res, next)=>{
    try {
        const inmuebles = await Inm.find();
        res.status(200).json(inmuebles);
    } catch (error) {
        res.status(300).send(error);
    }
}

const getI = async (req, res, next)=>{
    const {idInm} = req.params
    try {
       const inmueble = await Inm.findById(idInm)
       console.log(inmueble)
       res.json(inmueble)
    } catch (error) {
        res.send(error);
    }
}

module.exports = {
    getInm,
    getI
}