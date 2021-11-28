const express = require('express');
const assesor = express.Router();
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, next){
        next(null, "./src/public/uploads/img/inmuebles")
    },
    filename: function(req, file, next){
        next(null, `${Date.now()}_${file.originalname.replaceAll(' ', '-')}`)
    }
})
const upload = multer({storage})
const {isAssesor} = require('../../middlewars/index')
const { createInm, getOwnInm, deleteInm, postImg} = require('../../controllers/inmuebles')


assesor.get('/', getOwnInm)
assesor.post('/uploads', isAssesor, upload.array('files', 6),postImg)
assesor.post('/create', createInm);
assesor.delete('/delete/:idInm', deleteInm)

module.exports = assesor