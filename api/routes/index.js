const express = require('express');
const router = express.Router();
const {signupUser, loginUser, validateUser} = require('../controllers/users');

router.post('/signup', signupUser)
router.post('/login', loginUser)
router.get('/agree', validateUser)



module.exports = router;