const User = require('../models/user')

const signupUser = async (req, res) => {
    const email = req.body.email;
    const userBD = await User.findOne({ email: email });
    if(userBD){
        res.status(404).json({ msg: "Email has an account" })
    }else{
        const newUser = new User();
        newUser.name = req.body.name;
        newUser.lastname = req.body.lastname;
        newUser.rol = req.body.rol;
        newUser.number = req.body.number;
        newUser.email = req.body.email;
        newUser.password = newUser.encryptPassword(req.body.password);
        await newUser.save()
        res.status(200).json({ msg: "user has been created", user: newUser })
    }
}

const loginUser = async (req, res, next) => {
    const email = req.body.email;
    const userBD = await User.findOne({ email: email })
    if (!userBD) {
        res.status(404).json({ msg: "User not found" })    
    }else if(!userBD.comparePassword(req.body.password)){
        res.status(404).json({ msg: "Password incorrect" })    
    }else {
        res.status(200).json({ msg: "user has been login", user: userBD });
        next()
    }
    

}

module.exports = {
    signupUser,
    loginUser,
}