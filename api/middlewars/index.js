const jwt = require('jsonwebtoken')
const SECRET_KEY = 'HelloPeter17122021'

const isAssesor = (req, res, next)=>{
    const token = req.headers.auth;
    try {
        let decoded = jwt.verify(token, SECRET_KEY)
        if(decoded.rol === 'ASESOR'){
            next()
        }else{
            res.status(401).send({message: 'Not authorized'});
        }
    } catch (error) {
        res.status(400).send(error);
    }
}


const isAuth = (req, res, next)=>{
    const token = req.headers.auth
    try {
        let decoded = jwt.verify(token, SECRET_KEY)
        if (decoded){
            next()
        }
        else{
            return
        }
    } catch (error) {
        res.send([])
    }
}

const isClient = (req, res, next)=>{
    const token = req.headers.auth
    try {
        let decoded = jwt.verify(token, SECRET_KEY)
        if (decoded.rol === 'CLIENT'){
            next()
        }
        else{
            return
        }
    } catch (error) {
        console.log('----------------->', error)
    }
}

module.exports ={
    isAssesor,
    isAuth,
    isClient,
}