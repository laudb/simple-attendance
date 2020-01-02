
// const LocalStrategy   = require('passport-local').Strategy;
const BearerStrategy  = require('passport-http-bearer');
const jwt             = require('jsonwebtoken');
const crypto          = require('crypto');
const User            = require('../models/user');
const secret          = process.env.JWT_KEY;


function verifyToken(req, res, next) {

    let token = req.headers['x-access-token'].split(' ')[1];

    if (!token) {
        return res.status(403).send({'response': 'No Token Provided.'})
    }

    jwt.verify( token, process.env.JWT_KEY, function(err, decoded) {

        if (err){
            return res.status(500).send({'response':'Failed to authenticate Token.'})
        }

        console.log({'decoded': decoded})

        next();
    })
 
}


module.exports = {
    verifyToken
}
