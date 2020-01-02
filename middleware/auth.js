
const jwt             = require('jsonwebtoken');
const secret          = process.env.JWT_KEY;


function verifyToken(req, res, next) {

    let token = req.headers['x-access-token'].split(' ')[1];

    if (!token) { return res.status(403).send({'response': 'No Token Provided.'}) }

    jwt.verify( token, secret, function(err, decoded) {

        if (err){
            return res.status(500).send({'response':'Failed to authenticate Token.'})
        }

        req.userId = decoded.id;

        next();
    })
 
}


module.exports = {
    verifyToken
}
