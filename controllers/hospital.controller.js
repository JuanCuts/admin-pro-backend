const bcryptjs = require('bcryptjs');
const { response } = require('express');
const { generateJWT } = require('../helpers/jwt');
const { erroRequest } = require('../helpers/error-request');
const Hospital = require('../models/hospital');

const getHospitals = async (req, res = response) => {
    const hospital = await Hospital.find({ user: req.uid })
        .populate('user', 'name email');

    res.json({
        ok: true,
        message: 'Hospitals',
        hospital
    });
}

const createHospital = async (req, res = response) => {
    const { name } = req.body;
    const uid = req.uid;

    try {
        const existName = await Hospital.findOne({ name });
        if (existName) return erroRequest(res, 400, false, `El hospital ${name} ya se encuentra registrado`);

        const hospital = new Hospital({
            user: uid,
            ...req.body
        });

        await hospital.save();

        res.json({
            ok: true,
            hospital
        });
    } catch (error) {
        erroRequest(res, 400, false, `Error inesperado... revisar los logs`);
    }

}

const updateHospital = async (req, res = response) => {

    // TODO: Validar token y comprobar si es correcto
    // const uid = req.params.id;

    try {
        // const userDB = await Hospital.findById(uid);
        // if (!userDB) return erroRequest(res, 400, false, `Usuario no encontrado`);

        // // Actualizaciones
        // const { password, google, email, ...fields } = req.body;

        // if (userDB.email !== email) {
        //     const emailExist = Hospital.findOne({ email });
        //     if (emailExist) return erroRequest(res, 400, false, `Ya existe un usuario con ese correo`);
        // }

        // fields.email = email;

        // const userUpload = await Hospital.findByIdAndUpdate(
        //     uid,
        //     fields,
        //     { new: true, useFindAndModify: false }
        // );

        res.json({
            ok: true,
            message: 'Hospitals',
            // user: userUpload
        });
    } catch (error) {
        erroRequest(res, 400, false, `Error inesperado... revisar los logs`);
    }
}


const deleteHospital = async (req, res = response) => {

    // TODO: Validar token y comprobar si es correcto
    // const uid = req.params.id;

    try {
        // const userDB = await Hospital.findById(uid);
        // if (!userDB) return erroRequest(res, 400, false, `Usuario no encontrado`);

        // await Hospital.findByIdAndDelete(uid);

        res.json({
            ok: true,
            message: 'Hospital delete',
        });
    } catch (error) {
        erroRequest(res, 400, false, `Error inesperado... revisar los logs`);
    }
}

module.exports = {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
}