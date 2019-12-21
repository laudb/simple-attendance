
const LocalStrategy   = require('passport-local').Strategy;
const BearerStrategy  = require('passport-http-bearer');
const JSONWebToken    = require('jsonwebtoken');
const crypto          = require('crypto');
const users           = require('./users.json');


const generateToken = function (req, res) {

    let payload = {
        id : user.id,
        username: user.username
    };

    let secret = crypto.randomBytes( 128 ).toString( 'base64' );
    
    let token  = JSONWebToken.sign( payload, secret );
    
    // req.user.secret = secret; 

    return token;

}

const verifyToken = function ( token, done ) {
    let payload = JSONWebToken.decode( token );
    let user    = users[ payload.username ];
    
    if ( user == null || user.id !== payload.id || user.username !== payload.username ) {
           return done( null, false );
    }

    JSONWebToken.verify( token, user.secret, function (err, decoded ) {
        if ( error || decoded == null ) {
            return done( error, false )
        }
        return done( null, user )
    });
}


const generateTokenHandler = function ( request, response ) {

    let user = request.user;

    // generate token
    let token = generateToken( user );

    // return the user a token to use
    response.send ( token );
}

const localStrategy = new LocalStrategy({
        usernameField : 'userEmail',
        passwordField : 'userPassCode'
    },
    function ( userEmail, userPassCode, done ) {
        // should use persisted users
        user = users[ userEmail ];

        if ( user == null ) {
            return done( null, false, { message: 'Invalid User' });
        }

        if ( user.password !== userPassCode ) {
            return done( null, false, { message: 'Invalid Password' });
        }

        done ( null, user );
});

const bearerStrategy = new BearerStrategy (
    verifyToken
)


module.exports = {
    localStrategy,
    bearerStrategy,
    generateTokenHandler
}
