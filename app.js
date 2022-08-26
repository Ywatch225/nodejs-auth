const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require("path");


dotenv.config({
    path: './.env'
})

const app = express();
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'authentification',
//     port: 8889
// });

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT 
});

const docs = path.join(__dirname, './public');

app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');
app.use(express.static(docs));

db.connect((error) => {
    if (error) {
        console.log(error);
    }else{
        console.log("base de donnee connectee");
    }
})

// app.get("/", (req, res) => {
//     res.sendFile(__dirname + '/views/index.html'); 
// });

// app.get("/inscription", (req, res) => {
//     res.sendFile(__dirname + '/views/inscription.html'); 
// });

app.use(express.urlencoded({extended: false}));
app.use(express.json()); 

//definir les routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(5000, () => {
    console.log("serveur demarre sur le port 5000 ");
})






