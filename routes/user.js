const express = require('express');
const {handleUserSignUp, handleUserLogin, handleUserLogout} = require("../controllers/user")
const router = express.Router();

router.post('/', handleUserSignUp)

router.post('/login', handleUserLogin)

router.get('/logout', handleUserLogout);

module.exports = router;