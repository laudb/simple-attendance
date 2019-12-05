    const express    = require('express')
    const app        = express()
    const bodyParser = require('body-parser')
    const logger     = require('morgan')
    const mongoose   = require('mongoose')
    const PORT       = 3001
    const Attendee   = require('./attendee')

    // deps. setup
    app.use(logger('dev'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // db
    mongoose.connect('mongodb://localhost:27017/attendeedb', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    const db = mongoose.connection;

    db.once('open', () => {
        console.log('Database Connected.')
    })

    db.once('error', () => {
        console.log('Database Error.')
    })

    // route
    app.get('/', (req, res) => res.status(200).send({'response': 'Simple Attendance v1'}) )

    app.post('/check-in', (req, res) => {
        // get user details
        let fullName     = req.body.fullName;
        let userEmail    = req.body.email;
        let userLocation = req.body.location;
        let checkInTime  = req.body.checkIn;
        
        // check valid user input
        if (!fullName || !userEmail || !checkInTime || !userLocation ) {
            res.status(400).send({'response': 'Input missing'});
        }
        
        Attendee.findOne({ userEmail }, function (err, attendee) {

            if (err) {
                res.status(500).send({'response': ' Save Error '})
            }

            if (attendee) {
                res.status(400).send({'response': 'An attendee with that email already exists. '})
            }

            else {

                const newAttendee = new Attendee({
                    fullName, userEmail, userLocation, checkInTime
                });

                newAttendee.save( () => {
                    res.status(201).send({"response": `Welcome ${fullName}, Check In time is ${checkInTime}` })
                });

            }

        });

    });

    app.post('/check-out', (req, res) => {

        // get user details
        let fullName     = req.body.fullName;
        let userEmail    = req.body.email;
        let userLocation = req.body.location;
        let checkOutTime = req.body.checkOut;
        
        // check valid user input
        if (!fullName || !userEmail || !checkOutTime || !userLocation  ) {
            res.status(400).send({'response': 'Input missing'});
        }

        //  check for existing user, remove account and return response
        Attendee.findOneAndDelete({ fullName, userEmail }, function(err, attendee ) {

            if (err) {
                res.status(500).send({'response': ' Delete Error'});
            }
            
            if (!attendee) {
                res.status(400).send({'response': 'No attendee with that email exists'});
            }

            else {
                res.status(200).send({'response': `Thank you ${fullName}, Check Out time is ${checkOutTime}`});
            }
            
        });

    });
    
    // app
    app.listen( PORT, () => {
        console.log(`Simple Attendance is live at ${PORT}`);
    });
