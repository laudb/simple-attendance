    const express        = require('express');
    const app            = express();
    const bodyParser     = require('body-parser');
    const logger         = require('morgan');
    const dotenv         = require('dotenv').config();
    const passport       = require('passport');
    const LocalStrategy  = require('passport-local').Strategy;
    const BearerStrategy = require('passport-http-bearer');

    const JSONWebToken   = require('jsonwebtoken');
    const   crypto       = require('crypto');

    const users          = require('./users.json');
    const db             = require('./db') ;
    const routes         = require('./routes');
    
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

        let payload = {
            id : user.id,
            username: user.username
        };

        let secret = crypto.randomBytes( 128 ).toString( 'base64' );
        
        let token  = JSONWebToken.sign( payload, secret );
        
        // req.user.secret = secret; 

        return token;

    }

    const generateTokenHandler = function ( request, response ) {

        let user = request.user;
 
        // generate token
        let token = generateToken( user );

        // return the user a token to use
        response.send ( token );
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

    const bearerStrategy = new BearerStrategy (
        verifyToken
    )

    passport.use( 'bearer', bearerStrategy )


    app.post(
        '/login',
        passport.authenticate( 'local', { session: false }),
        generateTokenHandler
    );

    app.get(
        '/userinfo',
        passport.authenticate( 'bearer', { session: false }),
        function ( request, response ) {
            let user = request.user;
            response.send({ 
                id: user.id,
                username: user.username
            })
        }
    );

    // config & routes
    app.use('/v1', routes.attendee);

    app.use(function(req, res, next) {
        return res.status(404).send({'response': 'Route Not Found.' })
    })
     
module.exports = app;

