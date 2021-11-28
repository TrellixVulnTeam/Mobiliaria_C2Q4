const express = require('express');
const profile_ = express.Router();
const {isAuth} = require('../../middlewars/index')
const {getProfile} = require('../../controllers/profile');
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, next){
        next(null, "./src/public/uploads/img/profile")
    },
    filename: function(req, file, next){
        next(null, `${Date.now()}_${file.originalname.replaceAll(' ', '-')}`)
    }
})
const upload = multer({storage})

profile_.get('/:token', isAuth, getProfile)


module.exports = profile_