const express = require('express');
const { loginEmployee } = require('./auth.controller');
const router = express.Router();


router.post('/login', loginEmployee);


module.exports=router