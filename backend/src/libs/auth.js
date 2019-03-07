const jwt = require('jsonwebtoken');
const _ = require('lodash');

function verifyJWTToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err || !decodedToken) {
                return reject(err)
            }

            resolve(decodedToken)
        })
    })
}

function createJWToken(details) {
    console.log('here' + details.sessionData);
    if (typeof details !== 'object') {
        details = {}
    }

    if (!details.maxAge || typeof details.maxAge !== 'number') {
        details.maxAge = 3600
    }

    /*details.sessionData = _.reduce(details.sessionData || {}, (memo, val, key) => {
        if (typeof val !== "function" && key !== "password") {
            memo[key] = val
        }
        return memo
    }, {});*/
    const secret = 'TOPSECRETTTTT';
    let now = Math.floor(Date.now() / 1000),
        iat = (now - 10),
        jwtId = Math.random().toString(36).substring(7);
    let payload = {
        iat: iat,
        jwtid: jwtId,
        audience: 'TEST',
        data: details.sessionData
    };
    jwt.sign(payload, secret, process.env.JWT_SECRET, {expiresIn: details.maxAge, algorithm: 'HS256'}, (err, token) => {
        if(err){
            console.log('Error occurred while generating token');
            console.log(err);
            return false;
        }
        else{
            if(token != false){
                return token;
            }
            else{
                res.send("Could not create token");
                res.end();
            }

        }
    });

    //return token
}

module.exports = {
    verifyJWTToken: verifyJWTToken,
    createJWToken: createJWToken
};