const mongoose   = require('mongoose')
let {MONGOURL} = process.env;


if (process.env.NODE_ENV === 'production') {
    
    MONGOURL = process.env.MONGOLAB_URI;

} else if (process.env.NODE_ENV === 'test') {

    MONGOURL = process.env.TEST_MONGOURL;

}


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
    console.log(`Database Connected: ${MONGOURL}`)
});

db.once('error', ( err ) => {
    console.log(`Database Error. ${err} `)
});

module.exports = db;