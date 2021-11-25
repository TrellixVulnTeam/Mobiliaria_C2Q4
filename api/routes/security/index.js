const express = require('express');
const security_ = express.Router();
const {getUsers, deleteUser} = require('../../controllers/users');

security_.get('/accounts', getUsers)
security_.delete('/delete', deleteUser)



module.exports = security_;