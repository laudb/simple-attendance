const { userValidationRules, validate } = require('../validator')
const User                              = require('../models/user')
const express                           = require('express')
const router                            = express.Router()

router.get('/', function (req, res) {
    res.status( 200 ).send({ 'response': 'Welcome Logged In User' })
})
