const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const {Schema} = mongoose;
const noprofile = 'http://localhost:4000/public/uploads/img/profile/no-profile.jpg'

const userSchema = new Schema({
    profile: {type: String, default: noprofile},
    name: String,
    lastname: String,
    password: String,
    rol: String,
    number: Number,
    email: String,
    password: String,
    favorites: {type: Array, default:[]},
    description: { type:String , default:"Cuentanos de ti"},
    active: {
        reason: {type: String, default: 'Activación Pendiente'},
        value: {type: Boolean, default: true}
    },
    accepted: {type: Boolean, default: false}
})

userSchema.methods.encryptPassword = (password)=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('users', userSchema)