const { userValidationRules, validate } = require('../validator');
const User                              = require('../models/user');
const express                           = require('express');
const router                            = express.Router();
const bcrypt                            = require('bcrypt');
const jwt                               = require('jsonwebtoken');
const passport                          = require('passport');
const { verifyToken }                   = require('../middleware/auth');

router.get('/', verifyToken, function (req, res) {
    res.status( 200 ).send({ 'response': 'Welcome Logged In User' });
});

router.post('/signup', function (req, res, next ) {

    User.find({ userEmail: req.body.email }, function (err, user) {

        if ( err ) { return res.status( 500 ).send({ 'response': 'Error finding User .' }); }
        if ( user.length >= 1 ) { return res.status( 400 ).send({ 'response': 'User already Exists .' }); } 
        else {

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


router.post('/login', (req, res) => {

    User.findOne({ userEmail: req.body.email }, function (err, user) {
        console.log({'user': user, 'email': req.body.email})
        if (err) return res.status(500).send('Error on the user');
        if (!user) return res.status(404).send('No User Found');
          
        bcrypt.compare( req.body.password, user.userPassCode, function (error, result) {
            if ( error ) { return res.status( 404 ).send({'response': 'Auth3 Error'}) }
            if ( result ) { 
                const token = jwt.sign({ userEmail: user.userEmail },
                    process.env.JWT_KEY, { 
                        expiresIn: 86400 
                    })
                console.log({'userEmail': user.userEmail, 'jwt': process.env.JWT_KEY })
                res.status( 200 ).send({ 'response': token })    
            }
        });

    });

});


router.delete('/:userId', (req, res) => {

    User.remove({ _id: req.params.userId }, function (err, user) {
        if ( err ) { return res.status( 400 ).send({ 'response': 'User cannot be deleted' }); }
        if ( user ) { return res.status( 200 ).send({ 'response': 'User has been removed' }); }
    });

});



module.exports = router;