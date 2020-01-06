const { attendeeValidationRules, validate } = require('../validator')
const User       = require('../models/user')
const Attendee   = require('../models/attendee')
const express    = require('express')
const router     = express.Router()

   // route
    router.get('/', (req, res) => res.status(200).send({'response': 'Simple Attendance v1 '}) )

    router.post('/:id/check-in', async (req, res) => {
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
        let userLocation = userLat + ', ' + userLong;
        
        User.findOne({_id: userId }, function (userErr, user) {

            if (userErr) { return res.status(400).send({'response': `User error. ${userErr}`}) };
            if (!user) { return res.status(400).send({'response': 'User does not exist'}) }; 

            Attendee.findOne({ userEmail }, function (attendeeErr, attendeeExists) {

                if (attendeeErr) { return res.status(400).send({'response': `User error. ${attendeeErr}`}) };
                if (attendeeExists) { return res.status(400).send({'response': `Attendee already exists.`}) }

                else {

                    let attendee = new Attendee({ fullName, userEmail, userLocation, checkInTime, userId })
                    attendee.save();
                    return res.status(200).send({ 'response': `Welcome ${fullName}, Check In time is ${checkInTime}` });

                }
            } );
        } );

   });

    router.post('/:id/check-out', (req, res) => {

        // get user details
        let fullName     = req.body.fullName;
        let userEmail    = req.body.email;
        let userLat      = req.body.lat;
        let userLong     = req.body.long;
        let checkOutTime = req.body.checkOut;
       
        // check valid user input
        if (!fullName || !userEmail || !userLat || !userLong || !checkOutTime ) {
            res.status(400).send({'response': 'Input missing'});
        }

        let userId = req.params.id;
        let userLocation = userLat + ', ' + userLong;

            User.findOne({_id: userId }, function (userErr, user) {

                if (userErr) { return res.status(400).send({'response': `User error. ${userErr}`}) };
                if (!user) { return res.status(400).send({'response': 'User does not exist'}) }; 

                Attendee.findOne({ userEmail, userId }, function (attendeeErr, attendee) {
                    if (attendeeErr) { return res.status(404).send({'response': `${attendeeErr}`}) }

                    if ( !attendee ) {

                        return res.status(400).send({'response': 'No attendee with that email exists'});           

                    } else {

                        if (attendee.checkInTime.toJSON() > req.body.checkOut) {
                            return res.status(400).send({'response': 'Check Out time is not valid'});
                        } 

                        attendee.remove()
                        attendee.save()
                        return res.status(200).send({'response': `Thank you ${fullName}, Check Out time is ${checkOutTime} `});
                    }
                    
                });

            });    

        });


module.exports = router