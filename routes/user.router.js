/*
    Ruta: api/users
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/user.controller');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.get('/', [validateJWT], getUsers);

router.post(
    '/',
    [
        validateJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('email', 'El correo es obligatorio').not().isEmpty(),
        check('email', 'No es un correo electrónico valido').isEmail(),
        validateFields
    ],
    createUser
);

router.put(
    '/:id',
    [
        validateJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El correo es obligatorio').not().isEmpty(),
        check('email', 'No es un correo electrónico valido').isEmail(),
        check('role', 'El correo es obligatorio').not().isEmpty(),
        validateFields
    ],
    updateUser
);

router.delete('/:id', [validateJWT], deleteUser);

module.exports = router;
