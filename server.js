const app     = require('./index') 
const PORT    = process.env.PORT

// app
app.listen( PORT, () => {
    console.log(`Simple Attendance is live at ${PORT}`);
});
