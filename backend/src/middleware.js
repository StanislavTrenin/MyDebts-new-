const auth = require('./libs/auth');


function verifyJWT_MW(req, res, next) {
    console.log('there ');
    //let token = req.token;
    let token = (req.method === 'POST') ? req.body.token : req.query.token;
    //let token = req.query.token;
    auth.verifyJWTToken(token)
        .then((decodedToken) => {
            req.user = decodedToken.data;
            next()
        })
        .catch((err) => {
            res.status(400)
                .json({message: "Invalid auth token provided."})
        })


}

module.exports = verifyJWT_MW;