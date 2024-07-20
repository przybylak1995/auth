const express = require('express');
const pool = require('../db');
const bcrypt = require('bcryptjs');
const router = express.Router();

const validateInputFields = (fields) => {
    const regex = /^[a-zA-Z0-9@.?!]+$/;
    const mailRegex = /^([^@]+@[^@]+\.[^@]+)$/;
    for (const field in fields) {
        if (!regex.test(fields[field])) {
            return 'Invalid input format';
        }
        if (field === 'password' && fields[field].length < 15) {
            return 'Password must be at least 15 characters long';
        }
        if (field === 'email' && !mailRegex.test(fields[field])) {
            return 'Invalid email format';
        }
    }
    return 'Validation successful';
};

const userValidationRules = () => {
    return async (req, res, next) => {
        const { firstname, lastname, email, password } = req.body;
        const fields = { firstname, lastname, email, password };
        const result = validateInputFields(fields)
        if (result === 'Validation successful' ) {
            next(); // Ga door naar de volgende middleware
        } else {
            
            res.status(400).json({ error: result });
        }
    };
};

router.post('/register',userValidationRules(),async(req,resp) =>
{
    const {firstname, lastname, email, password} = req.body;
    const type = 'unverified';
    if(password){
        console.log(password)
        const salt = bcrypt.genSaltSync(2);
        hashedPassword = await bcrypt.hash(password,salt);
        console.log(hashedPassword);
    }
    else{
        resp.redirect(`/login?error=${encodeURIComponent('Error registering user.')}`)
    }

    try {
        //Controleren als de gebruiker als bestaat 
        //nieuwe gebruiker toevoegen aan de database
        const result = await pool.query(
            'INSERT INTO users (firstname, lastname, password, email, type) VALUES ($1, $2, $3, $4, $5) RETURNING id, firstname, email',
            [firstname, lastname, hashedPassword, email, type]
            );
        console.log(result)
        resp.send("Register succes")
        
    } catch (error) {
        console.log(error.message)
        resp.redirect(`/login?error=${encodeURIComponent('Error registering user: Email taken.')}`);
    }
})

router.post('/login',userValidationRules(),async(req,resp) =>{
    const {email, password} = req.body;

})

module.exports= router;