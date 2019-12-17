const Attendee   = require('./attendee')
const express    = require('express')
const router     = express.Router()

   // route
    router.get('/', (req, res) => res.status(200).send({'response': 'Simple Attendance v1'}) )

    router.post('/check-in', (req, res) => {
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

   router.post('/check-out', (req, res) => {

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


module.exports = router