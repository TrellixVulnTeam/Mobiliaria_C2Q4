const express = require('express');
const profile_ = express.Router();
const {isAuth, isClient} = require('../../middlewars/index')
const {getProfile, postProfile, updateProfile, getFavorites, addFavorites, removeFavorites} = require('../../controllers/profile');
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, next){
        next(null, "./src/public/uploads/img/profile")
    },
    filename: function(req, file, next){
        next(null, req.query.namefile)
    }
})
const upload = multer({storage})
 
profile_.get('/', isAuth, getProfile)
profile_.get('/favorites', isClient, getFavorites)
profile_.patch('/favorites', isClient, addFavorites)
profile_.delete('/favorites', isClient, removeFavorites)
profile_.post('/uploads', isAuth, upload.single('file'), postProfile)
profile_.put('/update/:id',isAuth, updateProfile)


module.exports = profile_