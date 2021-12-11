const express = require('express');
const home_ = express.Router();
const {getInm, getI} = require('../../controllers/home');
const {sendTokenPass, verifyTokenPass, changePassword} = require('../../controllers/users')


home_.get('/forgot-password', sendTokenPass)
home_.get('/verify-token', verifyTokenPass)
home_.patch('/change-password', changePassword)
home_.get('/:idInm', getI)
home_.get('/', getInm)

module.exports = home_