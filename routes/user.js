const { userValidationRules, validate } = require('../validator');
const User                              = require('../models/user');
const express                           = require('express');
const router                            = express.Router();
const bcrypt                            = require('bcrypt');
const jwt                               = require('jsonwebtoken');
const { verifyToken }                   = require('../middleware/auth');

// non-verified routes
router.get('/', function (req, res) { res.status( 200 ).send({ 'response': 'Welcome Logged In User' }); });


router.post('/signup', function (req, res ) {

    User.find({ userEmail: req.body.email }, function (err, user) {

        if ( err ) { return res.status( 500 ).send({ 'response': 'Error finding User .' }); }
        if ( user.length >= 1 ) { return res.status( 400 ).send({ 'response': 'User already Exists .' }); } 
        else {

            bcrypt.hash( req.body.password, 12, ( err, hash ) => {
                if ( err ) { return res.status( 500 ).send({ 'response': 'Pass Code Error .' }); } 
                else {
    
                    const user = new User ({
                        fullName: req.body.fullName,
                        userEmail: req.body.email,
                        userPassCode: hash,
                        attendees:[],
                        isManager: true
                    });
    
                    user.save( (err, result) => {
                        if ( err ) {
                            return res.status( 400 ).send({'response': `Error Saving User: ${err}`})
                        }
                        return res.status( 201 ).send({'response': 'User has been created'})
                    });
                    
                }
            });

        }
    });

});


router.post('/login', (req, res) => {

    User.findOne({ userEmail: req.body.email }, function (err, user) {
        if (err) return res.status(500).send('Error on the user');
        if (!user) return res.status(404).send('No User Found');
          
        bcrypt.compare( req.body.password, user.userPassCode, function (error, result) {
            if ( error ) { return res.status( 404 ).send({'response': 'Auth Error'}) }
            if ( result ) { 
                const token = jwt.sign({ id: user._id },
                    process.env.JWT_KEY, { 
                        expiresIn: 86400 
                    })

                res.status( 200 ).send({ 'response': token })    
            }
        });

    });

});

// verified routes
router.get('/:id', verifyToken, (req, res) => { 
    res.status( 200 ).send({ 'response': `Welcome user: ${req.params.id}` }); 
});

router.get('/:id/attendees', verifyToken, async (req, res)=> {
    const { id } = req.params;
    const user = await User.findById(id).populate('attendees');
    res.status(200).send({'response': user.attendees });
});

router.delete('/:userId', verifyToken, (req, res) => {

    User.remove({ _id: req.params.userId }, function (err, user) {
        if ( err ) { return res.status( 400 ).send({ 'response': 'User cannot be deleted' }); }
        if ( user ) { return res.status( 200 ).send({ 'response': 'User has been deleted' }); }
    });

});



module.exports = router;