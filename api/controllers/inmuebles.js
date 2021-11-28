const Inm = require('../models/inmuebles');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'HelloPeter17122021';

const postImg = (req, res, next)=>{
    const file = req.files;
    console.log('------------->',file)
    if(file){
        let arr = []

        for(let i = 0; i<file.length; i++){
            console.log(`http://localhost:4000/${file[i].path.substr(4,file[i].path.length )}`)
            arr.push(`http://localhost:4000/${file[i].path.substr(4,file[i].path.length )}`)
        }
        console.log(arr)
        res.send({message: 'POSTED', paths: [...arr]})
    }
}

const createInm = async(req, res, next)=>{
    //console.log('--------------->',req.files)
    console.log('------------------> ------------>',req.body)
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
            const email = decoded.email
            const inmuebles = await Inm.find({"assesor.email":email})
            res.status(200).json(inmuebles)
        }else{
            res.send({message: 'no autorized'})
        }
    } catch (error) {
        res.status(400).send(error)
    }

}

const deleteInm=async(req, res, next)=>{
    const {idInm} = req.params
    const token = req.headers.auth
    try {
        const decoded = jwt.verify(token, SECRET_KEY)
        if(decoded.rol === 'ASESOR'){
            const Inmueble = await Inm.findByIdAndDelete(idInm)
            res.status({message: 'susess delete', type:Inmueble.type });
        }else{
            res.send({message: 'no autorized'})
        }
    } catch (error) {
        res.status(400).send(error)
        
    }
}

module.exports = {
    postImg,
    createInm,
    getOwnInm,
    deleteInm,
}