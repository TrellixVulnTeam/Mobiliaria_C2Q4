const express = require('express');
const auth_ = express.Router();
const {signupUser, loginUser, validateUser} = require('../../controllers/users');

auth_.post('/signup', signupUser)
auth_.post('/login', loginUser)
auth_.get('/agree', validateUser)



module.exports = auth_;