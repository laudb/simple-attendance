    const express                   = require('express');
    const app                       = express();
    const bodyParser                = require('body-parser');
    const logger                    = require('morgan');
    const dotenv                    = require('dotenv').config();

    const passport                  = require('passport');
    const db                        = require('./db') ;
    const routes                    = require('./routes');
    const { localStrategy,
            bearerStrategy, 
            generateTokenHandler }  = require('./auth')
    // deps. setup

    app.use(logger('dev'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());


    app.use(passport.initialize());


    passport.use('local', localStrategy)

    passport.use( 'bearer', bearerStrategy )

    
    // app.post(
    //     '/login',
    //     passport.authenticate( 'local', { session: false }),
    //     generateTokenHandler
    // );
    
    // app.get(
    //     '/userinfo',
    //     passport.authenticate( 'bearer', { session: false }),
    //     function ( request, response ) {
    //         let user = request.user;
    //         response.send({ 
    //             id: user.id,
    //             username: user.username
    //         })
    //     }
    // );


    // config & routes
    app.use('/v1', routes );

    app.use(function(req, res, next) {
        return res.status(404).send({'response': 'Route Not Found.' })
    })
     
module.exports = app;

