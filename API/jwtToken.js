const express = require('express');
const app = express();
const router = express.Router();

const jwt = require('jsonwebtoken');
const jwtKey = 'abcd';

// Schema Added...
const JWTSchema = require('../Schema/JWTSchema');

router.post('/login', async (req, res) => {
    try {
        const logIn = await JWTSchema.create({
            email: req.body.email,
            password: req.body.password,
        })
        jwt.sign({ logIn }, jwtKey, { expiresIn: "1min" }, (error, token) => {
            if (error) {
                res.send({ error: "Token is invalid" });
            } else {
                res.send({ logIn, auth: token });
            }
        })
    } catch (error) {
        console.log('error::: ', error);
        res.send({ err: error });
    }
})

router.get('/all', verify, async (req, res) => {
    try {
        const listLogin = await JWTSchema.find({});
        return res.send(listLogin);
    } catch (error) {
        console.log('error::: ', error);
        res.send({ err: error });
    }
})

// Middleware
function verify(req, res, next) {
    const tokenValidation = req.headers['authentication'];
    if (tokenValidation) {
        const validTokenD = tokenValidation.split('"')[1];
        jwt.verify(validTokenD, jwtKey, (error, valid) => {
            if (error) {
                console.log('error::: ', error);
                res.send(403, { err: "Authentication failed..." });
            } else { next(); }
        })
    } else {
        res.send(403, { err: "Authentication error..." });
    }
}

module.exports = router;