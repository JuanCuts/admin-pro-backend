const bcryptjs = require('bcryptjs');
const { response } = require('express');
const { generateJWT } = require('../helpers/jwt');
const { erroRequest } = require('../helpers/error-request');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');

const getDoctors = async (req, res = response) => {
    const doctor = await Doctor.find({ user: req.uid })
        .populate('user', 'name email')
        .populate('hospital', 'name');

    res.json({
        ok: true,
        message: 'Doctors',
        doctor
    });
}

const createDoctor = async (req, res = response) => {
    const { hospital } = req.body;
    const uid = req.uid;

    try {
        const existHospital = await Hospital.findById(hospital);
        if (!existHospital) return erroRequest(res, 400, false, `El hospital no se encuentra registrado`);

        const doctor = new Doctor({
            user: uid,
            ...req.body
        });

        await doctor.save();

        res.json({
            ok: true,
            doctor
        });
    } catch (error) {
        erroRequest(res, 500, false, `Error inesperado... revisar los logs`);
    }

}

const updateDoctor = async (req, res = response) => {

    // TODO: Validar token y comprobar si es correcto
    // const uid = req.params.id;

    try {
        // const userDB = await Doctor.findById(uid);
        // if (!userDB) return erroRequest(res, 400, false, `Usuario no encontrado`);

        // // Actualizaciones
        // const { password, google, email, ...fields } = req.body;

        // if (userDB.email !== email) {
        //     const emailExist = Doctor.findOne({ email });
        //     if (emailExist) return erroRequest(res, 400, false, `Ya existe un usuario con ese correo`);
        // }

        // fields.email = email;

        // const userUpload = await Doctor.findByIdAndUpdate(
        //     uid,
        //     fields,
        //     { new: true, useFindAndModify: false }
        // );

        res.json({
            ok: true,
            message: 'Doctors',
            // user: userUpload
        });
    } catch (error) {
        erroRequest(res, 400, false, `Error inesperado... revisar los logs`);
    }
}


const deleteDoctor = async (req, res = response) => {

    // TODO: Validar token y comprobar si es correcto
    // const uid = req.params.id;

    try {
        // const userDB = await Doctor.findById(uid);
        // if (!userDB) return erroRequest(res, 400, false, `Usuario no encontrado`);

        // await Doctor.findByIdAndDelete(uid);

        res.json({
            ok: true,
            message: 'Doctor delete',
        });
    } catch (error) {
        erroRequest(res, 400, false, `Error inesperado... revisar los logs`);
    }
}

module.exports = {
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor
}