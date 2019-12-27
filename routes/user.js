const { userValidationRules, validate } = require('../validator')
const User                              = require('../models/user')
const express                           = require('express')
const router                            = express.Router()
const bcrypt                            = require('bcrypt')


router.get('/', function (req, res) {
    res.status( 200 ).send({ 'response': 'Welcome Logged In User' });
});

router.post('/signup', function (req, res, next ) {

    User.find({ userEmail: req.body.email }, function (err, user) {

        if ( err ) { 

            return res.status( 500 ).send({ 'response': 'Error finding User .' });

        }
        if ( user.length >= 1 ) { 
            
            return res.status( 400 ).send({ 'response': 'User already Exists .' });

        } else {

            bcrypt.hash( req.body.password, 12, ( err, hash ) => {
                if ( err ) {
                    return res.status( 500 ).send({ 'response': 'Pass Code Error .' })
                } else {
    
                    const user = new User ({
                        fullName: req.body.fullName,
                        userEmail: req.body.email,
                        userPassCode: hash,
                        isManager: true
                    });
    
                    user.save( (err, result) => {
                        if ( err ) {
                            return res.status( 400 ).send({'response': 'Error Saving User'})
                        }
                        return res.status( 201 ).send({'response': 'User has been created'})
                    });
                }
            });

        }
    })

});

router.delete('/:userId', (req, res) => {
    User.remove({ _id: req.params.userId }, function (err, user) {
        if (err) { 
            return res.status( 400 ).send({ 'response': 'User cannot be deleted' }) 
        }

        if (user) {
            res.status( 200 ).send({ 'response': 'User has been removed' })
        }
    })
})

// router.post('/signin', function (req, res) {

// })


module.exports = router;