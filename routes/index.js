const express  = require('express');
const router   = express.Router();
const attendee = require('./attendee');
const user     = require('./user');

router.use('/api-status', function (req, res) { res.status( 200 ).send({ 'response': 'Simple Attendee v1' }) });
router.use('/attendee', attendee);
router.use('/user', user);

module.exports = router;