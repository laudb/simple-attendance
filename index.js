    const express    = require('express')
    const app        = express()
    const bodyParser = require('body-parser')
    const logger     = require('morgan')
    const dotenv     = require('dotenv').config()
    const PORT       = process.env.PORT

    const db         = require('./db') 
    const routes     = require('./routes')
    
    // deps. setup
    app.use(logger('dev'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    
    // config & routes
    app.use('/v1', routes);
     
    // app
    app.listen( PORT, () => {
        console.log(`Simple Attendance is live at ${PORT}`);
    });
    
module.exports = app;