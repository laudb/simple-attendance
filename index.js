    const express                   = require('express');
    const app                       = express();
    const bodyParser                = require('body-parser');
    const logger                    = require('morgan');
    const dotenv                    = require('dotenv').config();
    const helmet                    = require('helmet');
    const db                        = require('./db') ;
    const routes                    = require('./routes');
        
    
    app.use(helmet());
    app.use(logger('dev'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // config & routes
    app.use('/v1', routes );

    app.use(function(req, res, next) {
        return res.status(404).send({'response': 'Route Not Found.' })
    })
     
module.exports = app;

