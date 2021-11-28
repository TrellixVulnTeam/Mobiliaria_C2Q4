const express = require('express');
const routerApi = require('./routes/index')
const cors = require('cors');
const morgan = require('morgan');
const multer = require('multer')

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
routerApi(app, express, './src')

//starting server
app.listen(app.get('port'), ()=>console.log(`I am in http://localhost:${app.get('port')}`))