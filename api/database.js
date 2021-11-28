const mongoose = require('mongoose');
const {mongodb} = require('./keys');

mongoose.connect(mongodb.URI, {useNewUrlParser: true})
.then((db) => console.log(`Mongo DB has been conected in: ${db.connection.name}`))
.catch(err=>console.log(`This error has been interupt: \n${err}`)) 