const { response } = require('express');
const User = require('../models/user');

const getUsers = async (req, res) => {
    const users = await User.find();
    res.status(400).send({
        ok: true,
        message: 'Users',
        users
    });
}

const createUser = async (req, res = response) => {
    const { email } = req.body;

    try {
        const existEmail = await User.findOne({ email });
        if (existEmail) return erroRequest(res, 400, false, `El correo ya se encuentra registrado`);
        const user = new User(req.body);
        await user.save();
        res.status(400).send({
            ok: false,
            user
        });
    } catch (error) {
        erroRequest(res, 400, false, `Error inesperado... revisar los logs`);
    }

}

const erroRequest = (res, codeStatus, status, message) => {
    return res.status(codeStatus).send({
        ok: status,
        msg: message
    });
}

module.exports = {
    getUsers,
    createUser
}