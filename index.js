    const express    = require('express')
    const app        = express()
    const bodyParser = require('body-parser')
    const logger     = require('morgan')
    const dotenv     = require('dotenv').config()
    const passport   = require('passport')
    const LocalStrategy = require('passport-local').Strategy;

    const JSONWebToken = require('jsonwebtoken')
    const   crypto     = require('crypto')

    const users      = require('./users.json')
    const db         = require('./db') 
    const routes     = require('./routes')
    
    // deps. setup
    app.use(logger('dev'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(passport.initialize());

    const localStrategy = new LocalStrategy({
        usernameField : 'userEmail',
        passwordField : 'userPassCode'
    },
    function ( userEmail, userPassCode, done ) {
        user = users[ userEmail ];

        if ( user == null ) {
            return done( null, false, { message: 'Invalid User' });
        }

        if ( user.password !== userPassCode ) {
            return done( null, false, { message: 'Invalid Password' });
        }

        done ( null, user );
    });

    passport.use('local', localStrategy)


    const generateToken = function (req, res) {
        console.log('generateToken>>>>>', user)
        const payload = {
            id : user.id,
            username: user.username
        };

        const secret = crypto.randomBytes( 128 ).toString( 'base64' );
        
        const token  = JSONWebToken.sign( payload, secret );
        
        // req.user.secret = secret;

        return token;

    }

    const generateTokenHandler = function ( request, response ) {
         console.log('-----------', request.user)
         let user = request.user;
 
        // generate token
        let token = generateToken( user );

        // return the user a token to use
        response.send ( token );
    }


    app.post(
        '/login',
        passport.authenticate( 'local', { session: false }),
        generateTokenHandler
    );





    // config & routes
    app.use('/v1', routes.attendee);

    app.use(function(req, res, next) {
        return res.status(404).send({'response': 'Route Not Found.' })
    })
     
module.exports = app;

