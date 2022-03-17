/*
    Ruta: api/users
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, createUser } = require('../controllers/user.controller');
const { validateFields } = require('../middlewares/validate-fields');
const router = Router();

router.get('/', getUsers);
router.post(
    '/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('email', 'El correo es obligatorio').not().isEmpty(),
        check('email', 'No es un correo electrónico valido').isEmail(),
        validateFields
    ],
    createUser
);

module.exports = router;
