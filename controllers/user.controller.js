const bcryptjs = require('bcryptjs');
const { response } = require('express');
const User = require('../models/user');

const getUsers = async (req, res = response) => {
    const users = await User.find();
    res.json({
        ok: true,
        message: 'Users',
        users
    });
}

const createUser = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const existEmail = await User.findOne({ email });
        if (existEmail) return erroRequest(res, 400, false, `El correo ya se encuentra registrado`);

        const user = new User(req.body);

        // Encrypt password
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);

        await user.save();
        res.json({
            ok: true,
            user
        });
    } catch (error) {
        erroRequest(res, 400, false, `Error inesperado... revisar los logs`);
    }

}

const updateUser = async (req, res = response) => {

    // TODO: Validar token y comprobar si es correcto
    const uid = req.params.id;

    try {
        const userDB = await User.findById(uid);
        if (!userDB) return erroRequest(res, 400, false, `Usuario no encontrado`);

        // Actualizaciones
        const { password, google, email, ...fields } = req.body;

        if (userDB.email !== email) {
            const emailExist = User.findOne({ email });
            if (emailExist) return erroRequest(res, 400, false, `Ya existe un usuario con ese correo`);
        }

        fields.email = email;

        const userUpload = await User.findByIdAndUpdate(
            uid,
            fields,
            { new: true, useFindAndModify: false }
        );

        res.json({
            ok: true,
            message: 'Users',
            user: userUpload
        });
    } catch (error) {
        erroRequest(res, 400, false, `Error inesperado... revisar los logs`);
    }
}


const deleteUser = async (req, res = response) => {

    // TODO: Validar token y comprobar si es correcto
    const uid = req.params.id;

    try {
        const userDB = await User.findById(uid);
        if (!userDB) return erroRequest(res, 400, false, `Usuario no encontrado`);

        await User.findByIdAndDelete(uid);

        res.json({
            ok: true,
            message: 'User delete',
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
    getUsers,
    createUser,
    updateUser,
    deleteUser
}