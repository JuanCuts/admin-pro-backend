const jsonwebtoken = require("jsonwebtoken")

const generateJWT = (uid) => {

    return new Promise((resolve, reject) => {
        const payload = {
            uid
        };

        jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (err, token) => {
            if (err) return reject('No se pudo generar el JWT');
            resolve(token);
        });
    })
}

module.exports = {
    generateJWT
}