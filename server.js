const app     = require('./index') 
const http    = require('http')
const PORT    = process.env.PORT

// app
let server = http.createServer( app );
    server.listen( PORT, () => {
        console.log(`Simple Attendance is live at ${PORT}`);
    });



process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Process Ended')
    })
})