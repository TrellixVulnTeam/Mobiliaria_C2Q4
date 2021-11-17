const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

//Inicialitations
const app = express()


//settings
app.set('port', process.env.PORT || 4000)
require('./database')


//midelwares
app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({extended:true}));
app.use(express.json())

//routes
app.use('/', require('./routes/index'))

//starting server
app.listen(app.get('port'), ()=>console.log(`I am in http://localhost:${app.get('port')}`))