const User       = require('../models/user')
const express    = require('express')
const router     = express.Router()

router.post('/', function (req, res) {
    let email    = req.body.email;
    let passCode = req.body.passCode;

    // continue auth flow
})