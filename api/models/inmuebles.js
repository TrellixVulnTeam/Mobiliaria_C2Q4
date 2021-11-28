const mongoose = require('mongoose');
const {Schema} = mongoose

const inmuebleSchema = new Schema({
    type: String,
    city: String,
    sector: String,
    attr: {
        levels: Number,
        rooms: Number,
        baths: Number,
        garage: Number,
    },
    assesor: {
        name: String,
        email: String,
    },
    favs: {type: Number, default: 0},
    comments: {type:Array, default: [""]},
    date: {type: Date, default:Date.now},
    img:[],
    price:Number,
    description: String,
    tags:[],
    active:{type: Boolean, deault: true}
    
})


module.exports= mongoose.model('inmuebles', inmuebleSchema)