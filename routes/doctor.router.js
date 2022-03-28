/*
    Ruta: api/doctors
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { getDoctors, createDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctor.controller');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.get('/', [validateJWT], getDoctors);

router.post(
    '/',
    [
        validateJWT,
        check('name', 'El nombre del médico es obligatorio').not().isEmpty(),
        check('hospital', 'El hospital id debe ser valido y es obligatorio').isMongoId(),
        validateFields
    ],
    createDoctor
);

router.put(
    '/:id',
    [
        validateJWT,
        validateFields
    ],
    updateDoctor
);

router.delete('/:id', [validateJWT], deleteDoctor);

module.exports = router;
