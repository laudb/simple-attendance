    const express    = require('express')
    const bodyParser = require('body-parser')
    const app        = express()
    const PORT       = 3001

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.get('/', (req, res) => res.status(200).send({'message': 'Simple Attendance'}) )

    app.listen( PORT, ()=> {
        console.log(`Simple Attendance is live at ${PORT}`)
    })
