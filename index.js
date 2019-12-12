    const express    = require('express')
    const app        = express()
    const mongoose   = require('mongoose')
    const bodyParser = require('body-parser')
    const logger     = require('morgan')
    const dotenv     = require('dotenv')
          dotenv.config()
    const PORT       = process.env.PORT
    const MONGOURL   = process.env.MONGOURL
    
    // db
    mongoose.connect( MONGOURL,
        {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true 
        }
    )

    const db = mongoose.connection;

    db.once('open', () => {
        console.log('Database Connected.')
    })

    db.once('error', () => {
        console.log('Database Error.')
    })

    const routes     = require('./routes')
    
    // deps. setup
    app.use(logger('dev'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    
    // config & routes
    app.use('/v1', routes)
     
    // app
    app.listen( PORT, () => {
        console.log(`Simple Attendance is live at ${PORT}`);
    });
