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

router.post('/signin', function (req, res) {
    User.find({ userEmail: req.body.email }, function (err, user) {
        
        console.log(req.body.email)
        console.log(user)
        if ( err ) {
            return res.status( 401 ).send({ 'response': 'Auth1 Error' })
        }

        if ( user.length < 1 ) {
          return res.status( 404 ).send({ 'response': 'Auth2 Error' }) 
        }

        else {
            
            bcrypt.compare( req.body.password, user[0].userPassCode, function (error, result) {
                    if (error) {
                        return res.status( 401 ).send({ 'response': 'Auth3 Error .' });
                    }
                    if (result) {
                        return res.status( 200 ).send({ 'response': 'Auth Successful .' });
                    }
                    res.status( 400 ).send({ 'response': 'Auth4 Error .' })
            })
            
        }

    })
})

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



module.exports = router;