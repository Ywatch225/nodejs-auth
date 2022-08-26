'use strict';
const express=require('express');
const authControllet=require('../controllers/auth');
const router=express.Router();

router.post('/inscription', authControllet.inscription);
router.post('/connexion',authControllet.connexion);

module.exports = router;