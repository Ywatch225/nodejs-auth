const { json } = require("body-parser");
const mysql=require('mysql');
const bcrypt=require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT 
});

exports.inscription = (req, res) => {
    console.log(req.body);

    const {nom, email, password, confirmpassword} = req.body;

    db.query('SELECT email FROM users WHERE email = ?', [email], async(error, results)=> {
        if (error) {
            console.log(error);
        }

        if (results.length > 0) {
            return res.render('inscription', {
                message: "cet email est deja pris" 
            });
        }
        else if (password !== confirmpassword) {
            return res.render('inscription', {
                message: "le mot de passe n'est pas identique"
            });
        }
        // console.log(req.message);
        let cryptpaswword = await bcrypt.hash(password, 8);
        console.log(cryptpaswword);
        
        db.query('INSERT INTO users SET ?', {nom: nom, email:email, password: cryptpaswword}, (error, result)=>{
             if (error) {
                console.log(error);
             } else{
                console.log(result);
                return res.render('inscription', {
                    message: "Utilisateur enregistrer" 
                });
             }
        })
    });
    
}


