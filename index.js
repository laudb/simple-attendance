    const express    = require('express')
    const bodyParser = require('body-parser')
    const app        = express()
    const PORT       = 3001

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.get('/', (req, res) => res.status(200).send({'message': 'Simple Attendance v1'}) )

    app.post('/check-in', (req, res, err, next) => {
        
        // get user details
        let fullName    = req.body.fullName;
        let userEmail   = req.body.email;
        let checkInTime = req.body.checkIn;
        
        // check valid user input
        if (!fullName || !userEmail || !checkInTime ) {
            res.status(400).send({'message': 'Input missing'})
        }


        // save information and return response
        res.status(201).send({"message": `Welcome ${fullName}, you arrived at ${checkInTime}`})
        next()
    })

    app.post('/check-out', (req, res, err, next) => {

        // get user details
        let fullName     = req.body.fullName;
        let userEmail    = req.body.email;
        let checkOutTime = req.body.checkOut;
        
        // check valid user input
        if (!fullName || !userEmail || !checkOutTime ) {
            res.status(400).send({'message': 'Input missing'})
        }

        // check for existing user, remove account and return response
        res.status(200).send({"message": `Thank you ${fullName}, your check out time is ${checkOutTime}`})
        next()
    })

    app.listen( PORT, () => {
        console.log(`Simple Attendance is live at ${PORT}`)
    })
