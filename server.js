const app     = require('./index') 
const PORT    = process.env.PORT

// app
let server = app.listen( PORT, () => {
    console.log(`Simple Attendance is live at ${PORT}`);
});

process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Process Ended')
    })
})