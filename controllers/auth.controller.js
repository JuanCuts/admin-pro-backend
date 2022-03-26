const bcryptjs = require('bcryptjs');
const { response } = require('express');
const { generateJWT } = require('../helpers/jwt');
const User = require('../models/user');

const login = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const userDB = await User.findOne({ email });
        if (!userDB) return erroRequest(res, 400, false, `Contraseña no valida`);

        // Encrypt password
        const validatePassword = bcryptjs.compareSync(password, userDB.password);
        if (!validatePassword) return erroRequest(res, 400, false, `Contraseña no valida`);


        const token = await generateJWT(userDB.id);

        res.json({
            ok: true,
            message: 'HOLA LOGIN!!',
            token
        });
    } catch (error) {
        erroRequest(res, 400, false, `Error inesperado... revisar los logs`);
    }

}

const erroRequest = (res, codeStatus, status, message) => {
    return res.status(codeStatus).json({
        ok: status,
        msg: message
    });
}

module.exports = {
    login
}