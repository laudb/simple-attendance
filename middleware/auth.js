
// const LocalStrategy   = require('passport-local').Strategy;
const BearerStrategy  = require('passport-http-bearer');
const JSONWebToken    = require('jsonwebtoken');
const crypto          = require('crypto');
// const users           = require('./users.json');
const User            = require('../models/user');
const secret          = process.env.JWT_KEY;


// const generateToken = function (req, res) {

//     let payload = {
//         id : user._id,
//         username: user.fullName,
//         email: user.userEmail
//     };
    
//     let token  = JSONWebToken.sign( payload, secret );
    
//     // req.user.secret = secret; 

//     return token;

// }

// const generateTokenHandler = function ( request, response ) {

//     let user = request.user;

//     // generate token
//     let token = generateToken( user );

//     // return the user a token to use
//     response.send ( token );
// }



const verifyToken = function ( token, done ) {

    let payload = JSONWebToken.decode( token );
    console.log('payload', payload)
    User.findOne( { userEmail: payload.userEmail }, (err, result) => {
        if (err) {
            console.log('err', err);
        }

        // if ( result == null || result.id !== payload.id || result.fullName !== payload.fullName ) {       
        if ( result == null ) {
            return done( null, false );
        } 
        
        JSONWebToken.verify( token, secret, function (error, decoded ) {
            if ( error || decoded == null ) {
                return done( error, false )
            }
            return done( null, result )
        }) ;
    });
}

const bearerStrategy = new BearerStrategy ( verifyToken )


// localStrategy,
module.exports = {
    verifyToken,
    bearerStrategy
}
