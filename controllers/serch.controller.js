const { response } = require('express');
const { erroRequest } = require('../helpers/error-request');
const { helperCollection } = require('../helpers/serch-collection');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');
const User = require('../models/user');

const getAllSerch = async (req, res = response) => {
    if (!req.params.text) erroRequest(res, 400, false, `No se envió el texto a buscar`);

    const serch = req.params.text;
    const serchRegex = new RegExp(serch, 'i');

    const [user, doctor, hospital] = await Promise.all([
        User.find({ name: serchRegex }),
        Doctor.find({ name: serchRegex }),
        Hospital.find({ name: serchRegex })
    ]);

    res.json({
        ok: true,
        message: 'Serch',
        text: req.params.text,
        user,
        doctor,
        hospital
    });
}

const getSerchCollection = async (req, res = response) => {

    const { text, table } = req.params;
    if (!text) erroRequest(res, 400, false, `No se envió el texto a buscar`);
    if (!table) erroRequest(res, 400, false, `No se envió la tabla a buscar`);

    const serchRegex = new RegExp(text, 'i');

    const collection = helperCollection[table] || null;
    if (!collection) return erroRequest(res, 400, false, `La tabla no se ecuentra disponible`);

    const data = await collection.find({ name: serchRegex });

    res.json({
        ok: true,
        message: 'Serch',
        data
    });
}
module.exports = {
    getAllSerch,
    getSerchCollection
}