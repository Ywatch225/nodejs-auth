'use strict';
const express=require('express');
const authControllet=require('../controllers/auth');
const router=express.Router();

router.post('/inscription', authControllet.inscription);


module.exports = router;