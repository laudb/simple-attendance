const { body, validationResult } = require('express-validator');

const userValidationRules = () => {
    return [
        body('username').isEmail(),
        body('password').isLength({min: 5})
    ]
}

const attendeeValidationRules = () => {
    return [
        body('fullName').isLength({ min: 5 }),
        body('userEmail').isEmail(),
        body('userLat').isLatLong(),
        body('userLong').isLatLong(),
        body('checkInTime').isDataURI()
    ]
}

const validate = ( req, res, next ) => {
    const errors = validationResult( req )
    if ( errors.isEmpty() ) {
        return next()
    }
    const extractedErrors = []
    errors.array().map( err => extractedErrors.push({ [err.param]: err.msg }) )

    return res.status(422).json({
        errors: extractedErrors
    })
}

module.exports = {
    userValidationRules,
    attendeeValidationRules,
    validate
}