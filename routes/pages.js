const express = require("express");

const router = express.Router();

router.get('/', (req, res) =>{
    res.render('index'); 
})

router.get('/inscription', (req, res) =>{
    res.render('inscription', {message:''});
});

router.get('/connexion', (req, res) =>{
    res.render('connexion', {message:''});
});

router.get('/dashboard', (req, res) =>{
    res.render('dashboard', {message:''});
});


module.exports = router;