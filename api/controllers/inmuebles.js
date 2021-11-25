const Inm = require('../models/inmuebles');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'HelloPeter17122021';

const createInm = async(req, res, next)=>{
    const token = req.headers.auth;
    const body = req.body
    try {
        const decoded = jwt.verify(token, SECRET_KEY)
        const email = decoded.email;
        const name = `${decoded.name}`
        const inmueble = new Inm({
            ...body,
            assesor: {
                name, 
                email
            }
        })
        inmueble.save()
        res.status(200).send({
            message: "Inmueble has been created"
        });

    } catch (error) {
        res.status(300).send(error);
    }
}

const getOwnInm = async(req, res, next)=>{
    const token = req.headers.auth;
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        if(decoded.rol === 'ASESOR'){
            console.log(decoded)
            const email = decoded.email
            const inmuebles = await Inm.find({"assesor.email":email})
            res.status(200).json(inmuebles)
        }else{
            res.send({message: 'no autorized'})
        }
    } catch (error) {
        res.status(500).send(error)
    }

}

module.exports = {
    createInm,
    getOwnInm,
}