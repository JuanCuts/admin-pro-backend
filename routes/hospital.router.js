/*
    Ruta: api/hospitals
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { getHospitals, createHospital, updateHospital, deleteHospital } = require('../controllers/hospital.controller');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.get('/', [validateJWT], getHospitals);

router.post(
    '/',
    [
        validateJWT,
        check('name', 'El nombre del hospital es obligatorio').not().isEmpty(),
        validateFields
    ],
    createHospital
);

router.put(
    '/:id',
    [
        validateJWT,
        validateFields
    ],
    updateHospital
);

router.delete('/:id', [validateJWT], deleteHospital);

module.exports = router;
