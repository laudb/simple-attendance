    const express    = require('express')
    const app        = express()
    const bodyParser = require('body-parser')
    const logger     = require('morgan')
    const dotenv     = require('dotenv').config()
    const passport   = require('passport')
       LocalStrategy = require('passport-local').Strategy;

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


    app.post(
        '/login',
        passport.authenticate( 'local', { session: false }),
        function (request, response) {
            response.send( 'User Id: ' + request.user.id )

        })

    // config & routes
    app.use('/v1', routes.attendee);

    app.use(function(req, res, next) {
        return res.status(404).send({'response': 'Route Not Found.' })
    })
     
module.exports = app;

