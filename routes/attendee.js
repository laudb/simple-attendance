const { attendeeValidationRules, validate } = require('../validator')
const Attendee                              = require('../models/attendee')
const express                               = require('express')
const router                                = express.Router()
const { verifyToken }                       = require('../middleware/auth');


   // route
    router.get('/', verifyToken, (req, res) => res.status(200).send({'response': 'Simple Attendance v1 '}) );

    router.post('/check-in', verifyToken, (req, res) => {
        // get user details
        let fullName     = req.body.fullName;
        let userEmail    = req.body.email;
        let userLat      = req.body.lat;
        let userLong     = req.body.long;
        let checkInTime  = req.body.checkIn;
        
        // check valid user input
        if (!fullName || !userEmail || !userLat || !userLong || !checkInTime ) {
            res.status(400).send({'response': 'Input missing '});
        }
       
        Attendee.findOne({ userEmail }, function (err, attendee) {

            if (err) { res.status(500).send({'response': 'Save Error '}); }
            if (attendee) { res.status(400).send({'response': 'An attendee with that email already exists. '}); }
            else {

                const newAttendee = new Attendee({
                    fullName, userEmail, userLat, userLong, checkInTime
                });

                newAttendee.save( () => {
                    res.status(201).send({"response": `Welcome ${fullName}, Check In time is ${checkInTime} ` })
                });
            }
        });

    });

    router.post('/check-out', verifyToken, (req, res) => {

        // get user details
        let fullName     = req.body.fullName;
        let userEmail    = req.body.email;
        let userLat      = req.body.lat;
        let userLong     = req.body.long;
        let checkOutTime = req.body.checkOut;
       
        // check valid user input
        if (!fullName || !userEmail || !userLat || !userLong || !checkInTime ) {
            res.status(400).send({'response': 'Input missing'});
        }

        //  check for existing user, remove account and return response
        Attendee.findOneAndDelete({ fullName, userEmail }, function(err, attendee ) {

            if ( err ) { res.status(500).send({'response': ' Delete Error'}); }
            if (attendee.checkInTime.toJSON() > req.body.checkOut) {
                res.status(400).send({'response': 'Check Out time is not valid'});
            }
            if ( !attendee ) { res.status(400).send({'response': 'No attendee with that email exists'}); }
            else {
                res.status(200).send({'response': `Thank you ${fullName}, Check Out time is ${checkOutTime} `});
            }
           
       });

   });


module.exports = router