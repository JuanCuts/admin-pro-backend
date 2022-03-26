/*
    Ruta: api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validate-fields');
const router = Router();

router.post(
    '/',
    [
        check('email', 'El correo es obligatorio').not().isEmpty(),
        check('email', 'No es un correo electrónico valido').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validateFields
    ],
    login
);

module.exports = router;
