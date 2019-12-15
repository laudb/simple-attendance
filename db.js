const mongoose   = require('mongoose')
const MONGOURL   = process.env.MONGOURL

// db
 mongoose.connect( MONGOURL,
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useCreateIndex: true 
    }
)

const db = mongoose.connection;

db.once('open', () => {
    console.log('Database Connected.')
});

db.once('error', () => {
    console.log('Database Error.')
});

module.exports = db;