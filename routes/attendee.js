const { attendeeValidationRules, validate } = require('../validator')
const User   = require('../models/user')
const Attendee   = require('../models/attendee')
const express    = require('express')
const router     = express.Router()

   // route
    router.get('/', (req, res) => res.status(200).send({'response': 'Simple Attendance v1 '}) )

    router.post('/:id/check-in', (req, res) => {
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

        let userId = req.params.id;

        let user   = User.children.id( userId );
        user.children.push({ fullName, userEmail, userLat, userLong, checkInTime })
        user.save( function (err) {
            if (err) return res.status(400).send({ 'response': err });
            return res.status(200).send({"response": `Welcome ${fullName}, Check In time is ${checkInTime}` })
        });
        // Attendee.findOne({ userEmail }, function (err, attendee) {

        //     if (err) { res.status(500).send({'response': 'Save Error '}) }
        //     if (attendee) { res.status(400).send({'response': 'An attendee with that email already exists. '}) }
        //     else {

        //         const newAttendee = new Attendee({ fullName, userEmail, userLat, userLong, checkInTime });
        //         newAttendee.save( () => { res.status(201).send({"response": `Welcome ${fullName}, Check In time is ${checkInTime}` }); });}

        // });

   });

    router.post('/:id/check-out', (req, res) => {

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

        let userId = req.params.id;

        let user   = User.children.id( userId );
        let attendee = user.children.userEmail(userEmail);

        if (attendee.checkInTime.toJSON() > req.body.checkOut) {
            res.status(400).send({'response': 'Check Out time is not valid'});
        }

        if (!attendee) {
            return res.status(400).send({'response': 'No attendee with that email exists'});
        }
        attendee.remove();
        user.save( function (err) {
            if (err) return res.status(400).send({ 'response': err });
            return res.status(200).send({'response': `Thank you ${fullName}, Check Out time is ${checkOutTime} `});
        });

        //  check for existing user, remove account and return response
    //     Attendee.findOneAndDelete({ fullName, userEmail }, function(err, attendee ) {

    //         if ( err ) {
    //             res.status(500).send({'response': ' Delete Error'});
    //         }

    //         if (attendee.checkInTime.toJSON() > req.body.checkOut) {
    //             res.status(400).send({'response': 'Check Out time is not valid'});
    //         }
           
    //         if ( !attendee ) {
    //             res.status(400).send({'response': 'No attendee with that email exists'});
    //         }

    //         else {
    //             res.status(200).send({'response': `Thank you ${fullName}, Check Out time is ${checkOutTime} `});
    //         }
           
    //    });

    });


module.exports = router