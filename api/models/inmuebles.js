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
    favs: Number,
    comments: String,
    date: {type: Date, default:Date.now},
    img:{
        img1:String,
        img2:String,
        img3:String,
        img4:String,
    },
    price:Number
    
})


module.exports= mongoose.model('inmuebles', inmuebleSchema)