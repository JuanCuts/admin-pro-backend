const jsonwebtoken = require("jsonwebtoken");
const { erroRequest } = require("../helpers/error-request");

const validateJWT = (req, res, next) => {
    // Leer el token
    const token = req.header('x-token');
    if (!token) return erroRequest(res, 401, false, `Token no encontrado`);

    try {

        const { uid } = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();

    } catch (error) {
        return erroRequest(res, 401, false, `Token no valido`);
    }
}

module.exports = {
    validateJWT
}