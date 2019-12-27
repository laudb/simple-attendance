const express  = require('express');
const router   = express.Router();
const attendee = require('./attendee');
const user     = require('./user');

router.use('/attendee', attendee);
router.use('/user', user);

module.exports = router;