const jwt = require('jsonwebtoken');
const _ = require('lodash');

function verifyJWTToken(token) {
    console.log('lets vetify jwt'+token);
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err || !decodedToken) {
                return reject(err)
            }

            resolve(decodedToken)
        })
    })
}

async function createJWToken(details) {

    return new Promise((resolve, reject) => {
        console.log('here' + details.sessionData);
        if (typeof details !== 'object') {
            details = {}
        }

        if (!details.maxAge || typeof details.maxAge !== 'number') {
            details.maxAge = 3600
        }

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
        console.log('Creating token');

        jwt.sign(payload, secret, {expiresIn: details.maxAge, algorithm: 'HS256'}, (err, token) => {
            console.log('check if all ok');
            if(err){
                console.log('Error occurred while generating token');
                console.log(err);
                return false;
            }
            else{
                if(token != false){
                    console.log('Success token = '+token);
                    //res.send(token);
                    //return token;
                    resolve(token);

                }
                else{
                    res.send("Could not create token");
                    res.end();
                }

            }
        });
    });


    //return token

}

module.exports = {
    verifyJWTToken: verifyJWTToken,
    createJWToken: createJWToken
};