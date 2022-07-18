const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');
const Hospital = require('../models/user');
const fs = require('fs');
const updateImage = (type, id, nameFile) => {
    switch (type) {

        case 'doctor':

            const doctor = await Doctor.findById(id);
            if (!doctor) return false;

            const pathOld = `./uploads/${type}/${doctor.img}`;
            if (fs.existsSync(pathOld)) fs.unlink(pathOld);

            doctor.img = nameFile;
            await doctor.save();

            return true;

        case 'hospital':
            break;

        case 'user':
            break;

        default:
            break;
    }
}


module.exports = {
    updateImage
}