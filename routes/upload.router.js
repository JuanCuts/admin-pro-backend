/*
    Ruta: api/uploads/
*/

const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { fileUpload } = require('../controllers/upload.controller');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();
router.use(expressFileUpload());

router.put('/:type/:id', [validateJWT], fileUpload);


module.exports = router;