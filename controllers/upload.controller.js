const { response } = require('express');
const { erroRequest } = require('../helpers/error-request');
const { helperCollectionName } = require('../helpers/serch-collection');
const { extensionValidate } = require('../helpers/upload-request');
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require('../helpers/update-image')

const fileUpload = async (req, res = response) => {

    // Validaciones
    const { type, id } = req.params;
    if (!type) erroRequest(res, 400, false, `No se envió el tipo`);
    if (!id) erroRequest(res, 400, false, `No se envió el id`);

    if (!helperCollectionName.includes(type)) return erroRequest(res, 404, false, `Folder no encontrado`);
    if (!req.files || Object.keys(req.files).length === 0) return erroRequest(res, 400, false, `No se envió el Archivo`);

    // Procesar imagen
    const img = req.files.img;
    const name = img.name.split('.');
    const extensionFile = name[name.length - 1];

    // Validar extension
    if (!extensionValidate.includes(extensionFile)) return erroRequest(res, 400, false, `No es una extensión valida`);

    // Generar el nombre del archivo
    const nameFile = `${uuidv4()}.${extensionFile}`;

    // Path para guardar imagen
    const path = `./uploads/${type}/${nameFile}`;
    img.mv(path, (err) => {
        if (err) return erroRequest(res, 500, false, `Error al mover la imagen`);

        //Actualizar DB
        updateImage(type, id, nameFile);

        res.json({
            ok: true,
            message: 'fileUpload',
            nameFile
        });
    });
}

module.exports = {
    fileUpload
}