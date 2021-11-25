const express = require('express');
const assesor = express.Router();
const { createInm, getOwnInm} = require('../../controllers/inmuebles')

assesor.post('/create', createInm);
assesor.get('/', getOwnInm)

module.exports = assesor