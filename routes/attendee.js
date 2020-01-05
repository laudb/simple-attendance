const { attendeeValidationRules, validate } = require('../validator')
const User   = require('../models/user')
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
        
        User.findOne({_id: userId }, function (err, user) {
            let attendee = new Attendee({ fullName, userEmail, userLocation, checkInTime, userId })
            if (err) { return res.status(400).send({'response': `User error. ${err}`}) };
            if (user) {
                user.attendees.push(attendee);
                user.save();
                res.json({ 'response': `Welcome ${fullName}, Check In time is ${checkInTime}` });
            }
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

        User.findOne({ userId }, async function (err, user) {
            
            if (err) { return res.status(400).send({'response': `${err}`})}

            let attendee = await Attendee.findOne({ userEmail, userId })
            
            console.log({'user': user, 'attendee': attendee})

            if (!attendee) {
                return res.status(400).send({'response': 'No attendee with that email exists'});
            }

            if (attendee.checkInTime.toJSON() > req.body.checkOut) {
                res.status(400).send({'response': 'Check Out time is not valid'});
            }
            
            if ( attendee ) {
                user.attendees.remove(attendee)
                user.save( function (err) {
                    if (err) return res.status(400).send({ 'response': err });
                    return res.status(200).send({'response': `Thank you ${fullName}, Check Out time is ${checkOutTime} `});
                });

            };

        });
    
        // Attendee.findOne({ userEmail, userId }, async function ( err, attendee ) {
            
        //     let user = await  User.findById( userId );
        //     if ( err ) { return res.status( 400 ).send({'response': `User error. ${err}`}) };
        //     console.log({'user': user, 'attendee': attendee})
        //     if (attendee.checkInTime.toJSON() > req.body.checkOut) {
        //         res.status(400).send({'response': 'Check Out time is not valid'});
        //     }
        //     if (!attendee) {
        //         return res.status(400).send({'response': 'No attendee with that email exists'});
        //     }
        //     if ( attendee ) {
        //         user.attendees.remove(attendee)
        //         user.save( function (err) {
        //             if (err) return res.status(400).send({ 'response': err });
        //             return res.status(200).send({'response': `Thank you ${fullName}, Check Out time is ${checkOutTime} `});
        //         });

        //     };
        // });

        // let attendee = await user.children.userEmail(userEmail);
         



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