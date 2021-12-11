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
const {isAssesor, isClient} = require('../../middlewars/index')
const { createInm, getOwnInm, deleteInm, postImg, addComment, getComments} = require('../../controllers/inmuebles')


assesor.get('/', getOwnInm)
assesor.post('/uploads', isAssesor, upload.array('files', 6),postImg)
assesor.post('/create', createInm);
assesor.delete('/delete/:idInm', deleteInm)
assesor.get('/comments', getComments)
assesor.patch('/comments', isClient, addComment)

module.exports = assesor